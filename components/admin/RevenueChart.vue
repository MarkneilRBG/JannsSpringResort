```vue
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
          <option value="week">Daily</option>
          <option value="year">Monthly</option>
        </select>

        <!-- MONTH -->
        <select v-if="filter === 'week'" v-model="selectedMonth" class="form-select w-auto">
          <option v-for="(m, i) in months" :key="i" :value="i">
            {{ m }}
          </option>
        </select>

        <!-- CABIN -->
        <select v-model="selectedCabin" class="form-select w-auto">
          <option value="all">All Cabins</option>
          <option value="talisay">Talisay</option>
          <option value="malobago">Malobago</option>
        </select>

      </div>
    </div>

    <!-- TOTAL -->
    <div class="mb-2">
      <h5 class="fw-bold mb-0">₱{{ totalRevenue.toLocaleString() }}</h5>
      <small class="text-muted">Total Revenue</small>
    </div>

    <!-- CHART -->
    <Bar :data="chartData" :options="chartOptions" />

    <!-- DEBUG TABLE -->
    <div class="mt-4 p-3 border rounded bg-light">
      <h6>🔍 Debug Bookings ({{ filteredBookings.length }})</h6>

      <table class="table table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Start</th>
            <th>End</th>
            <th>Paid</th>
            <th>Status</th>
            <th>Cabin</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in filteredBookings" :key="b.id">
            <td>{{ b.id }}</td>
            <td>{{ b.start_datetime }}</td>
            <td>{{ b.end_datetime }}</td>
            <td>₱{{ b.paid }}</td>
            <td>{{ b.status }}</td>
            <td>{{ b.cabin }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
)

const { $api } = useNuxtApp()

/* =========================
   STATE
========================= */
const bookings = ref([])
const filter = ref('week')
const selectedMonth = ref(new Date().getMonth())
const selectedCabin = ref('all')

/* =========================
   FETCH (🔥 FIXED)
========================= */
const fetchBookings = async () => {
  try {
    const res = await $api('/bookings', {
      params: {
        per_page: 1000 // make sure backend supports this
      }
    })

    // ✅ FIX: get actual array
    bookings.value = res.data || []

    console.log('ALL BOOKINGS:', bookings.value)

  } catch (err) {
    console.error(err)
  }
}

onMounted(fetchBookings)

/* =========================
   HELPERS
========================= */
const parseLocal = (dt) => {
  if (!dt) return null
  const clean = dt.replace("T", " ").replace("Z", "").split(".")[0]
  return new Date(clean)
}

const normalizeCabin = (name) => {
  return name?.toLowerCase().replace(' cabin', '').trim()
}

/* =========================
   FILTER BOOKINGS
========================= */
const filteredBookings = computed(() => {
  return bookings.value.filter(b => {

    // ❌ skip cancelled
    if (b.status === 'cancelled') return false

    // ✅ show all
    if (selectedCabin.value === 'all') return true

    // ✅ match cabin safely
    return normalizeCabin(b.cabin)
      ?.includes(selectedCabin.value.toLowerCase())
  })
})

/* =========================
   TOTAL REVENUE
========================= */
const totalRevenue = computed(() => {
  return filteredBookings.value.reduce(
    (sum, b) => sum + Number(b.paid || 0),
    0
  )
})

const months = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]

/* =========================
   DAILY REVENUE
========================= */
const generateDailyByMonth = (monthIndex) => {
  const year = new Date().getFullYear()
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

  const result = Array(daysInMonth).fill(0)

const parseDateOnly = (dt) => {
  if (!dt) return null

  // 🔥 REMOVE TIME + UTC SHIFT
  const clean = dt.replace("T", " ").replace("Z", "").split(".")[0]
  return new Date(clean)
}


  filteredBookings.value.forEach(b => {
    const start = parseDateOnly(b.start_datetime)
    const end = parseDateOnly(b.end_datetime)

    if (!start || !end) return

    const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1
    const perDay = Number(b.paid || 0) / days

    let current = new Date(start)

    while (current <= end) {
      if (
        current.getMonth() === monthIndex &&
        current.getFullYear() === year
      ) {
        result[current.getDate() - 1] += perDay
      }

      current.setDate(current.getDate() + 1)
    }
  })

  return result
}

/* =========================
   MONTHLY REVENUE
========================= */
const generateYearlyRevenue = () => {
  const result = Array(12).fill(0)

  filteredBookings.value.forEach(b => {
    const start = parseLocal(b.start_datetime)
    if (!start) return

    result[start.getMonth()] += Number(b.paid || 0)
  })

  return result
}

/* =========================
   CHART DATA
========================= */
const chartData = computed(() => {

  const baseDataset = {
    backgroundColor: '#3b82f6',
    borderRadius: 6,
    barThickness: 20
  }

  if (filter.value === 'year') {
    return {
      labels: months,
      datasets: [{
        ...baseDataset,
        data: generateYearlyRevenue()
      }]
    }
  }

  const daysInMonth = new Date(
    new Date().getFullYear(),
    selectedMonth.value + 1,
    0
  ).getDate()

  return {
    labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
    datasets: [{
      ...baseDataset,
      data: generateDailyByMonth(selectedMonth.value)
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
```
