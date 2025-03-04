<template>
  <div class="card shadow-sm border-0 overflow-hidden">
    <div class="row g-0">
      <!-- Image Section (50%) -->
      <div class=" col-md-6">
        <NuxtImg src="resort2.jpg" class="w-100 h-100 object-fit-cover" :alt="title" />
      </div>

      <!-- Content Section (50%) -->
      <div class="col-md-6 d-flex align-items-center bg-primary text-white opacity-75">
        <div class="card-body">
          <h5 class="card-title ">{{ title }}</h5>
          <p class="card-text">{{ description }}</p>
          <a :href="link" class="btn btn-light" v-if="link">Read More</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, default: '' }
});
</script>

<style scoped>
/* Ensure the image fills its container completely */
.object-fit-cover {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
</style>
