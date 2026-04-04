<template>
  <div>
    <h4 class="fw-bold mb-3">Bookings</h4>

  
      <div class="">
        <AdminBookingCalendar />
      </div>


    <div class="mt-4">
      <AdminBookingTable />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin"
});
import AdminBookingCalendar from '~/components/admin/BookingCalendar.vue'
import AdminBookingTable from '~/components/admin/BookingTable.vue'



</script>