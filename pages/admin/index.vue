<template>
  <div>
    <h4 class="fw-bold mb-3">Dashboard</h4>

    <!-- STATS -->
    <AdminStatsCards />

    <!-- CHART -->
    <div class="mt-4">
      <AdminRevenueChart />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

definePageMeta({ layout: 'admin' })

import AdminStatsCards from '~/components/admin/StatsCards.vue'
import AdminRevenueChart from '~/components/admin/RevenueChart.vue'

/* 🔥 SAMPLE BOOKINGS (replace with real data later) */
const bookings = [
  { date: '2026-04-03', shift: 'AM' },
  { date: '2026-04-03', shift: 'PM' }, // full day
  { date: '2026-04-04', shift: 'AM' }, // partial
  { date: '2026-04-05', shift: 'PM' }, // partial
  { date: '2026-04-06', shift: 'AM' },
  { date: '2026-04-06', shift: 'PM' }  // full
]

const currentMonth = '2026-04'

/* GROUP BY DATE */
const grouped = computed(() => {
  const map = {}

  bookings.forEach(b => {
    if (!b.date.startsWith(currentMonth)) return

    if (!map[b.date]) map[b.date] = []

    map[b.date].push(b.shift)
  })

  return map
})

/* FULLY BOOKED */
const bookedDays = computed(() => {
  return Object.values(grouped.value).filter(shifts =>
    shifts.includes('AM') && shifts.includes('PM')
  ).length
})

/* PARTIAL */
const partialDays = computed(() => {
  return Object.values(grouped.value).filter(shifts =>
    shifts.length === 1
  ).length
})

/* AVAILABLE */
const availableDays = computed(() => {
  const totalDays = new Date(2026, 4, 0).getDate()
  return totalDays - bookedDays.value - partialDays.value
})
</script>

<style scoped>
.summary-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #f1f1f1;
}

.summary-value {
  font-size: 20px;
  font-weight: 700;
}

.summary-label {
  font-size: 13px;
  color: #6b7280;
}
</style>