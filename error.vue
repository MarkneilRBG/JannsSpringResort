<template>
  <section class="d-flex flex-column min-vh-100 align-items-center justify-content-center text-center">
    <h1 class="mb-2 display-1 fw-bold text-danger">
      {{ error?.statusCode }}
    </h1>
    <p class="mb-4 fs-3">
      {{ error?.statusMessage || 'Something went wrong' }}
    </p>
    <NuxtLink to="/" class="btn btn-warning btn-lg">
      Go Home
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
  error: Object as () => NuxtError,
});
</script>
