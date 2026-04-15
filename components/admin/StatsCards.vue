```vue
<template>
  <div class="row g-3">

    <div
      class="col-12 col-md-6 col-lg-3"
      v-for="card in cards"
      :key="card.label"
    >
      <div class="stat-card d-flex align-items-center p-3">

        <!-- ICON -->
        <div class="icon-box me-3" :style="{ background: card.bg }">
          <Icon :name="card.icon" size="1.3em" :style="{ color: card.color }" />
        </div>

        <!-- TEXT -->
        <div>
          <div class="stat-value">{{ card.value }}</div>
          <div class="stat-label">{{ card.label }}</div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const { $api } = useNuxtApp()

/* =========================
   STATE
========================= */
const bookings = ref([])

/* =========================
   FETCH
========================= */
const fetchBookings = async () => {
  try {
    const res = await $api('/bookings', {
      params: { per_page: 1000 }
    })

    bookings.value = res.data || []

  } catch (err) {
    console.error(err)
  }
}

onMounted(fetchBookings)

defineExpose({
  fetchBookings
})

/* =========================
   HELPERS
========================= */
const parseLocal = (dt) => {
  if (!dt) return null
  const clean = dt.replace("T", " ").replace("Z", "").split(".")[0]
  return new Date(clean)
}

const formatDate = (date) => {
  return date.toISOString().split('T')[0]
}

const isConfirmed = (b) =>
  b.status?.toLowerCase().trim() === 'confirmed'

const isCancelled = (b) =>
  ['cancelled', 'canceled'].includes(
    b.status?.toLowerCase().trim()
  )

/* =========================
   DATE
========================= */
const now = new Date()
const currentYear = now.getFullYear().toString()
const currentMonth = now.toISOString().slice(0, 7)

/* =========================
   💰 REVENUE (CONFIRMED ONLY)
========================= */
const totalRevenue = computed(() => {
  return bookings.value
    .filter(b =>
      isConfirmed(b) &&
      b.start_datetime?.startsWith(currentYear)
    )
    .reduce((sum, b) => sum + Number(b.paid || 0), 0)
})

/* =========================
   📅 GROUP BOOKINGS (ALL)
========================= */
const grouped = computed(() => {
  const map = {}

  bookings.value.forEach(b => {
    const start = parseLocal(b.start_datetime)
    const end = parseLocal(b.end_datetime)

    if (!start || !end) return

    let current = new Date(start)

    while (current <= end) {
      const dateStr = formatDate(current)

      if (!dateStr.startsWith(currentMonth)) {
        current.setDate(current.getDate() + 1)
        continue
      }

      if (!map[dateStr]) map[dateStr] = []

      map[dateStr].push(b)

      current.setDate(current.getDate() + 1)
    }
  })

  return map
})

/* =========================
   📅 BOOKED DAYS (ALL)
========================= */
const bookedDays = computed(() => {
  return Object.keys(grouped.value).length
})

/* =========================
   🏝️ BOOKED DAYS PER CABIN
========================= */
const bookedDaysPerCabin = computed(() => {
  const map = {
    talisay: new Set(),
    malobago: new Set()
  }

  bookings.value.forEach(b => {
    const cabin = b.cabin?.toLowerCase()

    const start = parseLocal(b.start_datetime)
    const end = parseLocal(b.end_datetime)

    if (!start || !end) return

    let current = new Date(start)

    while (current <= end) {
      const dateStr = formatDate(current)

      if (!dateStr.startsWith(currentMonth)) {
        current.setDate(current.getDate() + 1)
        continue
      }

      if (cabin.includes('talisay')) {
        map.talisay.add(dateStr)
      }

      if (cabin.includes('malobago')) {
        map.malobago.add(dateStr)
      }

      current.setDate(current.getDate() + 1)
    }
  })

  return {
    talisay: map.talisay.size,
    malobago: map.malobago.size
  }
})

/* =========================
   📆 AVAILABLE DAYS PER CABIN
========================= */
const availableDaysPerCabin = computed(() => {
  const totalDays = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate()

  return {
    talisay: totalDays - bookedDaysPerCabin.value.talisay,
    malobago: totalDays - bookedDaysPerCabin.value.malobago
  }
})

/* =========================
   ❌ CANCELLED COUNT
========================= */
const cancelledCount = computed(() => {
  return bookings.value.filter(b => isCancelled(b)).length
})

/* =========================
   FINAL CARDS
========================= */
const cards = computed(() => [
  {
    label: "Revenue (Year)",
    value: `₱${totalRevenue.value.toLocaleString()}`,
    icon: "mdi:cash-multiple",
    color: "#3b82f6",
    bg: "#eff6ff"
  },
  {
    label: "Booked Days",
    value: bookedDays.value,
    icon: "mdi:calendar-check",
    color: "#10b981",
    bg: "#ecfdf5"
  },
  {
    label: "Available Days",
    value: `Talisay: ${availableDaysPerCabin.value.talisay} | Malobago: ${availableDaysPerCabin.value.malobago}`,
    icon: "mdi:calendar",
    color: "#2563eb",
    bg: "#eff6ff"
  },
  {
    label: "Cancelled",
    value: cancelledCount.value,
    icon: "mdi:close-circle-outline",
    color: "#ef4444",
    bg: "#fef2f2"
  }
])
</script>

<style scoped>
.stat-card {
  background: white;
  border-radius: 14px;
  border: 1px solid #f1f1f1;
  transition: 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}

.icon-box {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-value {
  font-size: 16px;
  font-weight: 700;
}

.stat-label {
  font-size: 13px;
  color: #6b7280;
}
</style>
