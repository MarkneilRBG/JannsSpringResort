<template>
  <aside class="sidebar p-3">
    <h5 class="fw-bold text-orange mb-4">Admin</h5>

    <ul class="nav flex-column gap-2">
      <NuxtLink to="/admin" class="nav-item">Dashboard</NuxtLink>
      <NuxtLink to="/admin/bookings" class="nav-item">Bookings</NuxtLink>
      <NuxtLink to="/admin/rooms" class="nav-item">Rooms</NuxtLink>
      <NuxtLink to="/admin/inventory" class="nav-item">Inventory</NuxtLink>
    </ul>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 240px;
  background: #fff;
  border-right: 1px solid #eee;
}

.nav-item {
  padding: 10px;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
}

.nav-item:hover {
  background: #f1f1f1;
}

.router-link-active {
  background: #ffe9e0;
  color: #ff6b2c;
}
</style>