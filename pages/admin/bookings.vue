<template>
  <div>
    <h4 class="fw-bold mb-3">Bookings</h4>

    <!-- 📅 CALENDAR -->
    <div>
      <AdminBookingCalendar
        :bookings="bookings"
        @dateSelected="handleDateFilter"
      />
    </div>

    <!-- 📋 TABLE -->
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

<script setup>
import { ref, onMounted } from "vue";

import AdminBookingCalendar from '~/components/admin/BookingCalendar.vue'
import AdminBookingTable from '~/components/admin/BookingTable.vue'

definePageMeta({
  layout: "admin"
});

const { $api } = useNuxtApp();

// STATE
const bookings = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const lastPage = ref(1);

// FILTER
const selectedDate = ref(null);

/* =========================
   🔥 FETCH BOOKINGS
========================= */
const fetchBookings = async (page = 1) => {
  loading.value = true;

  try {
    const res = await $api('/bookings', {
      params: {
        page,
        date: selectedDate.value, // we will handle backend logic
      },
    });

    // ✅ FIX RESPONSE STRUCTURE
    bookings.value = res.data;
    currentPage.value = res.current_page;
    lastPage.value = res.last_page;

  } catch (error) {
    console.error("FETCH ERROR:", error);
  } finally {
    loading.value = false;
  }
};

/* =========================
   🔥 INITIAL LOAD
========================= */
onMounted(() => {
  fetchBookings();
});

/* =========================
   🔥 CALENDAR FILTER
========================= */
const handleDateFilter = (date) => {
  // convert to YYYY-MM-DD
  selectedDate.value = new Date(date).toISOString().split("T")[0];
  fetchBookings(1);
};
</script>