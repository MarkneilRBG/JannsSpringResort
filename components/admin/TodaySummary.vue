<template>
  <div class="row g-3 mb-4">
    <div class="col-6 col-md-3" v-for="card in cards" :key="card.label">
      <div class="card h-100 border-0 shadow-sm">
        <div class="card-body">
          <div class="text-muted small">{{ card.label }}</div>
          <div class="fs-4 fw-bold" :class="card.class">
            {{ card.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cards: Array
})
</script>