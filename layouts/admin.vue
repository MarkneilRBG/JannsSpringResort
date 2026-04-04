<template>
  <div class="admin-layout d-flex">
    <AdminSidebar />

    <div class="flex-grow-1">
      <AdminHeader />
      <div class="p-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import AdminSidebar from '~/components/admin/Sidebar.vue'
import AdminHeader from '~/components/admin/Header.vue'
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background: #f6f7fb;
}
</style>