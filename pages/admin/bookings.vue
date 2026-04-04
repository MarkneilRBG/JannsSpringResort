<template>
  <div>
    <h4 class="fw-bold mb-3">Bookings</h4>

    <div class="row g-3">
      <div class="col-lg-8">
        <AdminBookingCalendar />
      </div>

      <div class="col-lg-4 d-flex align-items-start">i
        <AdminStatsCards />
      </div>
    </div>

    <div class="mt-4">
      <AdminBookingTable />
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
import AdminBookingCalendar from '~/components/admin/BookingCalendar.vue'

import AdminStatsCards from '~/components/admin/StatsCards.vue'
import AdminBookingTable from '~/components/admin/BookingTable.vue'



</script>