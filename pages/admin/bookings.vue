<script setup>
import { ref, onMounted } from "vue";

import AdminBookingCalendar from '~/components/admin/BookingCalendar.vue'
import AdminBookingTable from '~/components/admin/BookingTable.vue'

definePageMeta({ layout: "admin" });

const { $api } = useNuxtApp();

/* =========================
   STATE
========================= */
const bookings = ref([])          // table
const calendarBookings = ref([])  // calendar

const loading = ref(false)
const currentPage = ref(1)
const lastPage = ref(1)

const selectedDate = ref(null)

/* =========================
   FETCH TABLE (FILTERED)
========================= */
const fetchBookings = async (page = 1) => {
  loading.value = true

  try {
    const res = await $api('/bookings', {
      params: {
        page,
        date: selectedDate.value
      }
    })

    bookings.value = res.data
    currentPage.value = res.current_page
    lastPage.value = res.last_page

  } finally {
    loading.value = false
  }
}

/* =========================
   FETCH CALENDAR (ALL DATA 🔥)
========================= */
const fetchCalendarBookings = async () => {
  try {
    const res = await $api('/bookings', {
      params: {
        per_page: 1000 // get all
      }
    })

    calendarBookings.value = res.data

  } catch (err) {
    console.error("Calendar fetch error:", err)
  }
}

/* =========================
   INIT
========================= */
onMounted(() => {
  fetchBookings()
  fetchCalendarBookings() // 🔥 IMPORTANT
})

/* =========================
   DATE FILTER
========================= */
const handleDateFilter = (date) => {
  selectedDate.value = new Date(date).toISOString().split("T")[0]
  fetchBookings(1)
}
</script>

<template>
  <div>
    <h4 class="fw-bold mb-3">Bookings</h4>

    <!-- 📅 CALENDAR (ALL BOOKINGS) -->
    <div>
      <AdminBookingCalendar
        :bookings="calendarBookings"
      />
    </div>

    <!-- 📋 TABLE (FILTERED) -->
    <div class="mt-4">
      <AdminBookingTable
        :bookings="bookings"
        :loading="loading"
        :currentPage="currentPage"
        :lastPage="lastPage"
        @changePage="fetchBookings"
      />
    </div>
  </div>
</template>