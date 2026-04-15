<template>
  <div class="card p-3">

    <!-- HEADER -->
    <div class="d-flex justify-content-between mb-3">
      <input class="form-control w-50" placeholder="Search..." />
      <button class="btn btn-outline-secondary">Filter</button>
    </div>

    <!-- TABLE -->
    <table class="table align-middle">
      <thead>
        <tr>
          <th>Name</th>
          <th>Cabin</th>
          <th>Guests</th>
          <th>Schedule</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="b in bookings" :key="b.id">

          <td>{{ b.name }}</td>

          <!-- CABIN -->
          <td>{{ b.cabin }}</td>

          <td>{{ b.guests }}</td>

          <!-- 🔥 SCHEDULE (START → END) -->
          <td>
            <div class="small text-muted">
              {{ formatDate(b.start_datetime) }}
              <span v-if="isOvernight(b)"> → {{ formatDate(b.end_datetime) }}</span>
            </div>

            <div class="fw-semibold small">
              {{ formatTime(b.start_datetime) }} → {{ formatTime(b.end_datetime) }}
            </div>
          </td>

          <!-- STATUS -->
          <td>
            <span :class="statusClass(b.status)">
              {{ b.status }}
            </span>
          </td>

          <!-- ACTION -->
          <td>
            <button
              v-if="b.status !== 'cancelled'"
              class="btn btn-sm btn-outline-danger"
              @click="cancelBooking(b.id)"
            >
              Cancel
            </button>

            <span v-else class="badge bg-secondary">
              Cancelled
            </span>
          </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  bookings: Array
})

const emit = defineEmits(['refresh'])

const { $api } = useNuxtApp()

/* =========================
   TIME HELPERS
========================= */
const parseLocal = (dt) => {
  if (!dt) return null
  const clean = dt.replace("T", " ").replace("Z", "").split(".")[0]
  return new Date(clean)
}

const formatDate = (dt) => {
  const d = parseLocal(dt)
  if (!d) return ''
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const formatTime = (dt) => {
  const d = parseLocal(dt)
  if (!d) return ''
  return d.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}

/* =========================
   OVERNIGHT CHECK
========================= */
const isOvernight = (b) => {
  return formatDate(b.start_datetime) !== formatDate(b.end_datetime)
}

/* =========================
   STATUS STYLE
========================= */
const statusClass = (status) => {
  return {
    'badge bg-success': status === 'confirmed',
    'badge bg-danger': status === 'cancelled',
    'badge bg-warning text-dark': status === 'pending'
  }
}

/* =========================
   CANCEL BOOKING
========================= */
const cancelBooking = async (id) => {
  try {
    // 🔥 1. update UI instantly
    const booking = props.bookings.find(b => b.id === id)
    if (booking) booking.status = 'cancelled'

    // 🔥 2. call API
    await $api(`/bookings/${id}/cancel`, {
      method: 'POST'
    })

    // 🔥 3. optional: still refresh from server
    emit('refresh')

  } catch (err) {
    console.error(err)
  }
}
</script>

<style scoped>
.table td {
  vertical-align: middle;
}
</style>