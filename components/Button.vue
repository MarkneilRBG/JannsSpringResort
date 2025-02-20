<template>
  <div>
    <button class="btn btn-primary">
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  buttonText: String
})
</script>