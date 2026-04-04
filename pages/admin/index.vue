<template>
  <div>
    <h4 class="fw-bold mb-3">Dashboard</h4>

    <AdminStatsCards />
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

import AdminStatsCards from '~/components/admin/StatsCards.vue'
</script>s
