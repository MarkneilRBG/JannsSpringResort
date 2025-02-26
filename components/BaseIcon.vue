<template>
  <div>
    <Icon :name="name" :size="size" :color="color" />
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "1.5em",
  },
  color: {
    type: String,
    default: "currentColor",
  },
});
</script>
