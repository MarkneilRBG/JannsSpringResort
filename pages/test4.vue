<template>
  <div>
    <!-- <h1>Select a Date</h1>
    <Flatpickr v-model="selectedDate" :config="flatpickrConfig" />
    <p>Selected Date: {{ selectedDate }}</p> -->

    <Testimonials />
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
});

// import { ref } from 'vue'
// import Flatpickr from 'vue-flatpickr-component'
// import 'flatpickr/dist/flatpickr.css'

// const selectedDate = ref(null)

// // Configure flatpickr options
// const flatpickrConfig = {
//   altInput: true,
//   altFormat: 'F j, Y',
//   dateFormat: 'Y-m-d',
// }
</script>
