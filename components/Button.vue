<template>
  <div>
    <button :class="['btn btn-primary', dynamicClass]">
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  buttonText: String,
  dynamicClass: String // Accepts additional dynamic class as a prop
});
</script>
