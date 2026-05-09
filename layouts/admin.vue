<template>
  <div class="admin-layout">

    <!-- SIDEBAR -->
    <AdminSidebar />

    <!-- MAIN WRAPPER -->
    <div
      class="main-wrapper"
      :class="{ collapsed: isCollapsed }"
    >
      <!-- HEADER -->
      <AdminHeader />

      <!-- CONTENT -->
      <div class="content container-fluid p-4">
        <slot />
      </div>
    </div>

  </div>
</template>

<script setup>
import AdminSidebar from '~/components/admin/Sidebar.vue'
import AdminHeader from '~/components/admin/Header.vue'
import { useSidebar } from '@/composables/useSidebar'

const { isCollapsed } = useSidebar()
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background: #f6f7fb;
}

/* MAIN WRAPPER */
.main-wrapper {
  margin-left: 240px;
  transition: all 0.25s ease;
}

/* COLLAPSED */
.main-wrapper.collapsed {
  margin-left: 70px;
}

/* HEADER FIX */
:deep(.admin-header) {
  position: sticky;
  top: 0;
  z-index: 900;
}
</style>