<template>
  <div class="card p-3">
    
    <!-- HEADER -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      
      <div>
        <h6 class="mb-0">Revenue Overview</h6>
        <small class="text-muted">Track earnings</small>
      </div>

      <!-- FILTERS -->
      <div class="d-flex gap-2">

        <!-- TYPE -->
        <select v-model="filter" class="form-select w-auto">
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
          <option value="year">Yearly</option>
        </select>

        <!-- RANGE (ONLY WEEKLY) -->
        <select v-if="filter === 'week'" v-model="range" class="form-select w-auto">
          <option :value="7">7 days</option>
          <option :value="14">14 days</option>
          <option :value="30">30 days</option>
        </select>

        <!-- MONTH (ONLY MONTH VIEW) -->
        <select v-if="filter === 'month'" v-model="selectedMonth" class="form-select w-auto">
          <option v-for="(m, i) in months" :key="i" :value="i">
            {{ m }}
          </option>
        </select>

        <!-- CABIN -->
        <select v-model="selectedCabin" class="form-select w-auto">
          <option value="all">All Cabins</option>
          <option value="Malobago">Malobago</option>
          <option value="Talisay">Talisay</option>
        </select>

      </div>
    </div>

    <!-- TOTAL -->
    <div class="mb-2">
      <h5 class="fw-bold mb-0">₱{{ totalRevenue.toLocaleString() }}</h5>
      <small class="text-muted">Total Revenue</small>
    </div>

    <!-- CHART -->
    <Line :data="chartData" :options="chartOptions" />

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

/* =========================
   STATE
========================= */
const filter = ref('week')
const range = ref(7)
const selectedMonth = ref(new Date().getMonth())
const selectedCabin = ref('all')

/* =========================
   BOOKINGS DATA (REPLACE LATER)
========================= */
const bookings = [
  { date: '2026-01-10', price: 2000, cabin: 'Malobago' },
  { date: '2026-02-15', price: 1500, cabin: 'Talisay' },
  { date: '2026-03-20', price: 1800, cabin: 'Malobago' },
  { date: '2026-04-01', price: 1500, cabin: 'Malobago' },
  { date: '2026-04-03', price: 2000, cabin: 'Talisay' }
]

/* =========================
   FILTER CABIN
========================= */
const filteredBookings = computed(() => {
  if (selectedCabin.value === 'all') return bookings
  return bookings.filter(b => b.cabin === selectedCabin.value)
})

/* =========================
   TOTAL
========================= */
const totalRevenue = computed(() => {
  return filteredBookings.value.reduce((sum, b) => sum + b.price, 0)
})

/* =========================
   HELPERS
========================= */
const months = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]

/* =========================
   WEEKLY
========================= */
const generateWeeklyRevenue = (days) => {
  const today = new Date()

  return Array.from({ length: days }, (_, i) => {
    const d = new Date()
    d.setDate(today.getDate() - (days - 1 - i))

    return filteredBookings.value
      .filter(b => new Date(b.date).toDateString() === d.toDateString())
      .reduce((sum, b) => sum + b.price, 0)
  })
}

const generateDates = (days) => {
  const today = new Date()

  return Array.from({ length: days }, (_, i) => {
    const d = new Date()
    d.setDate(today.getDate() - (days - 1 - i))
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  })
}

/* =========================
   MONTHLY (BY DAY)
========================= */
const generateMonthlyRevenue = (monthIndex) => {
  const year = new Date().getFullYear()
  const days = new Date(year, monthIndex + 1, 0).getDate()

  const result = Array(days).fill(0)

  filteredBookings.value.forEach(b => {
    const d = new Date(b.date)
    if (d.getMonth() === monthIndex) {
      result[d.getDate() - 1] += b.price
    }
  })

  return result
}

/* =========================
   YEARLY (BY MONTH 🔥)
========================= */
const generateYearlyRevenue = () => {
  const result = Array(12).fill(0)

  filteredBookings.value.forEach(b => {
    const d = new Date(b.date)
    result[d.getMonth()] += b.price
  })

  return result
}

/* =========================
   CHART DATA
========================= */
const chartData = computed(() => {

  if (filter.value === 'year') {
    return {
      labels: months,
      datasets: [{
        data: generateYearlyRevenue(),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.1)',
        tension: 0.4,
        fill: true
      }]
    }
  }

  if (filter.value === 'month') {
    return {
      labels: Array.from(
        { length: new Date(2026, selectedMonth.value + 1, 0).getDate() },
        (_, i) => i + 1
      ),
      datasets: [{
        data: generateMonthlyRevenue(selectedMonth.value),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.1)',
        tension: 0.4,
        fill: true
      }]
    }
  }

  return {
    labels: generateDates(range.value),
    datasets: [{
      data: generateWeeklyRevenue(range.value),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.1)',
      tension: 0.4,
      fill: true
    }]
  }
})

/* =========================
   OPTIONS
========================= */
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => `₱${ctx.raw.toLocaleString()}`
      }
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 14px;
  border: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

:deep(canvas) {
  max-height: 300px;
}
</style>