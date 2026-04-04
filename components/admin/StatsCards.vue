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
import { computed } from 'vue'

/* 🔥 SAMPLE BOOKINGS (REPLACE WITH API LATER) */
const bookings = [
  { date: '2026-04-03', shift: 'AM', status: 'booked', price: 1500 },
  { date: '2026-04-03', shift: 'PM', status: 'booked', price: 1500 },
  { date: '2026-04-04', shift: 'AM', status: 'pending', price: 1500 },
  { date: '2026-04-05', shift: 'PM', status: 'cancelled', price: 1500 },
  { date: '2026-04-06', shift: 'AM', status: 'booked', price: 1500 },
  { date: '2026-04-06', shift: 'PM', status: 'booked', price: 1500 }
]

const currentYear = '2026'
const currentMonth = '2026-04'

/* =========================
   TOTAL REVENUE (YEAR)
========================= */
const totalRevenue = computed(() => {
  return bookings
    .filter(b => b.date.startsWith(currentYear) && b.status === 'booked')
    .reduce((sum, b) => sum + (b.price || 0), 0)
})

/* =========================
   CANCELLED
========================= */
const cancelledCount = computed(() => {
  return bookings.filter(b => b.status === 'cancelled').length
})

/* =========================
   GROUP BY DATE (MONTH)
========================= */
const grouped = computed(() => {
  const map = {}

  bookings.forEach(b => {
    if (!b.date.startsWith(currentMonth)) return

    if (!map[b.date]) map[b.date] = []

    if (b.status === 'booked') {
      map[b.date].push(b.shift)
    }
  })

  return map
})

/* =========================
   FULLY BOOKED DAYS
========================= */
const bookedDays = computed(() => {
  return Object.values(grouped.value).filter(shifts =>
    shifts.includes('AM') && shifts.includes('PM')
  ).length
})

/* =========================
   AVAILABLE DAYS
========================= */
const availableDays = computed(() => {
  const totalDays = new Date(2026, 4, 0).getDate()
  return totalDays - bookedDays.value
})

/* =========================
   FINAL CARDS (ONLY 4)
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
    value: availableDays.value,
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
  font-size: 20px;
  font-weight: 700;
}

.stat-label {
  font-size: 13px;
  color: #6b7280;
}
</style>