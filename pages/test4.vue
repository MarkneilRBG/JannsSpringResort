<template>
  <div>
    <div class="position-absolute w-100 d-flex justify-content-center" style="top: 50%; z-index:10;">
      <button class="btn btn-primary d-block d-sm-none btn-indigo-200" @click="showModal = true">Book Now</button>
    </div>

    <BaseModal :show="showModal" @close="showModal = false">
  <h3 class="text-center">Book Your Stay</h3>
  <p>Choose your dates and number of guests below:</p>
  <form>
    <div class="mb-3">
      <label for="checkIn" class="form-label">Check-in Date:</label>
      <input type="date" class="form-control" id="checkIn" v-model="today">
    </div>
    <div class="mb-3">
      <label for="checkOut" class="form-label">Check-out Date:</label>
      <input type="date" class="form-control" id="checkOut" v-model="tomorrow">
    </div>
    <div class="mb-3">
      <label for="guests" class="form-label">Guests:</label>
      <input type="number" class="form-control" id="guests" placeholder="Enter number of guests">
    </div>
    <button type="button" class="btn btn-success w-100">Confirm Booking</button>
  </form>
</BaseModal>

  </div>
</template>

<script setup>
definePageMeta({
  layout: false
});


import { ref } from "vue";
import BaseModal from "@/components/BaseModal.vue"; // Import the modal component

const showModal = ref(false);
const today = ref(new Date().toISOString().split("T")[0]);
const tomorrow = ref(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]);
</script>
