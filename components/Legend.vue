<template>
  <div class="d-flex align-items-center gap-2">
    <div :style="{ width: '15px', height: '15px', background: color }"></div>
    <small>{{ label }}</small>
  </div>
</template>

<script setup>
defineProps({
  color: String,
  label: String
})
</script>