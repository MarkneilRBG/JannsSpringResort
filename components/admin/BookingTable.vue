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
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="b in bookings" :key="b.id">
          <td>{{ b.name }}</td>
          <td>{{ b.room }}</td>
          <td>{{ b.guests }}</td>
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
const bookings = [
  { id: 1, name: "Lucas", room: 304, guests: 3, status: "Booked" },
  { id: 2, name: "James", room: 302, guests: 2, status: "Pending" }
]

const statusClass = (status) => {
  return {
    'badge bg-success': status === 'Booked',
    'badge bg-warning text-dark': status === 'Pending',
    'badge bg-danger': status === 'Cancelled'
  }
}
</script>