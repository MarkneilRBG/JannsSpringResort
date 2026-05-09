<template>
  <div>
    <h4 class="fw-bold mb-3">Today</h4>

    <!-- SUMMARY -->
    <TodaySummary :cards="summaryCards" />

    <!-- CABINS -->
    <div class="row g-3">
      <CabinCard
        v-for="c in cabins"
        :key="c"
        :cabin="c"
        :checkIn="getCheckIn(c)"
        :checkOut="getCheckOut(c)"
        :attendance="getAttendance(c)"
        :formatTime="formatTime"
        @click="openModal(c)"
      />
    </div>

    <!-- MODAL -->
    <BulkCheckinModal
      v-if="showBulk && selectedBooking"
      :booking="selectedBooking"
      @close="showBulk = false"
      @saved="handleSaved"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TodaySummary from '~/components/admin/TodaySummary.vue'
import CabinCard from '~/components/admin/CabinCard.vue'
import BulkCheckinModal from '~/components/admin/BulkCheckinModal.vue'

definePageMeta({ layout: 'admin' })

const { $api } = useNuxtApp()

const bookings = ref([])
const attendance = ref({})
const showBulk = ref(false)
const selectedBooking = ref(null)

const cabins = ['Talisay Cabin', 'Malobago Cabin']

const todayStr = new Date().toISOString().split('T')[0]

/* =========================
   HELPERS
========================= */
const parseLocal = (dt) => {
  if (!dt) return null
  return new Date(dt.replace("T", " ").replace("Z", "").split(".")[0])
}

const formatDate = (d) => d.toISOString().split('T')[0]

const formatTime = (dt) =>
  parseLocal(dt)?.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })

/* =========================
   FETCH
========================= */
const fetchBookings = async () => {
  const res = await $api('/bookings', {
    params: { per_page: 1000 }
  })
  bookings.value = res.data
}

const fetchAttendance = async () => {
  const res = await $api('/attendance')
  attendance.value = res.data.data || {}
}

onMounted(() => {
  fetchBookings()
  fetchAttendance()
})

/* =========================
   AFTER SAVE
========================= */
const handleSaved = () => {
  fetchBookings()
  fetchAttendance()
}

/* =========================
   TODAY BOOKINGS
========================= */
const todayBookings = computed(() =>
  bookings.value.filter(b => {
    const s = parseLocal(b.start_datetime)
    return s && formatDate(s) === todayStr
  })
)

/* =========================
   OPEN MODAL
========================= */
const openModal = (cabin) => {
  const booking = todayBookings.value.find(b => b.cabin === cabin)

  if (!booking) {
    alert('No booking for this cabin today')
    return
  }

  selectedBooking.value = booking
  showBulk.value = true
}

/* =========================
   SUMMARY
========================= */
const summaryCards = computed(() => [
  { label: 'Check-ins', value: todayBookings.value.length },
  {
    label: 'Check-outs',
    value: bookings.value.filter(b => {
      const e = parseLocal(b.end_datetime)
      return e && formatDate(e) === todayStr
    }).length
  },
  {
    label: 'Pending',
    value: todayBookings.value.filter(b => (b.amount - b.paid) > 0).length,
    class: 'text-warning'
  },
  {
    label: 'Revenue',
    value: '₱' + todayBookings.value.reduce((s, b) => s + (b.paid || 0), 0),
    class: 'text-success'
  }
])

/* =========================
   CABIN LOGIC
========================= */
const getCheckIn = (cabin) =>
  todayBookings.value.find(b => b.cabin === cabin)

const getCheckOut = (cabin) =>
  bookings.value.find(b => {
    const e = parseLocal(b.end_datetime)
    return b.cabin === cabin && e && formatDate(e) === todayStr
  })

const getAttendance = (cabin) =>
  attendance.value[cabin] || []
</script>