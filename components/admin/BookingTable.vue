<template>
  <div class="card p-3">
    <div class="d-flex justify-content-between mb-3">
      <input class="form-control w-50" placeholder="Search..." />
      <button class="btn btn-outline-secondary">Filter</button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Room</th>
          <th>Guests</th>
          <th>Date</th>
          <th>Time</th> <!-- ✅ updated -->
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="b in bookings" :key="b.id">
          <td>{{ b.name }}</td>
          <td>{{ b.room }}</td>
          <td>{{ b.guests }}</td>

          <!-- DATE -->
          <td>{{ formatDate(b.date) }}</td>

          <!-- TIME RANGE -->
          <td>
            <span class="badge bg-info text-dark">
              {{ b.time }}
            </span>
          </td>

          <!-- STATUS -->
          <td>
            <span :class="statusClass(b.status)">
              {{ b.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
/* =========================
   DATA (🔥 UPDATED)
========================= */
const bookings = [
  {
    id: 1,
    name: "Lucas",
    room: 304,
    guests: 3,
    status: "Booked",
    date: "2026-04-10",
    time: "8:00 AM - 5:00 PM" // ✅ NEW FORMAT
  },
  {
    id: 2,
    name: "James",
    room: 302,
    guests: 2,
    status: "Pending",
    date: "2026-04-11",
    time: "1:00 PM - 10:00 PM"
  }
]

/* =========================
   STATUS STYLE
========================= */
const statusClass = (status) => {
  return {
    'badge bg-success': status === 'Booked',
    'badge bg-warning text-dark': status === 'Pending',
    'badge bg-danger': status === 'Cancelled'
  }
}

/* =========================
   FORMAT DATE
========================= */
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>