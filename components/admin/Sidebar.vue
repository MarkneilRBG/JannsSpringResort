<template>
  <div>
    <!-- 🔹 Mobile Header -->
    <div class="d-md-none d-flex justify-content-between align-items-center p-3 border-bottom">
      <h5 class="fw-bold text-orange mb-0">Admin</h5>

      <button
        class="btn btn-outline-dark"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarMenu"
      >
        <Icon name="mdi:menu" size="22" />
      </button>
    </div>

    <!-- 🔹 DESKTOP SIDEBAR -->
    <aside class="sidebar p-3 d-none d-md-block">
      <h5 class="fw-bold text-orange mb-4">Admin</h5>

      <ul class="nav flex-column gap-2">
        <NuxtLink to="/admin" class="nav-item d-flex align-items-center gap-2">
          <Icon name="mdi:view-dashboard" />
          Dashboard
        </NuxtLink>

        <NuxtLink to="/admin/bookings" class="nav-item d-flex align-items-center gap-2">
          <Icon name="mdi:calendar-check" />
          Bookings
        </NuxtLink>

        <NuxtLink to="/admin/cabin" class="nav-item d-flex align-items-center gap-2">
          <Icon name="mdi:bed" />
          Cabins
        </NuxtLink>

        <NuxtLink to="/admin/inventory" class="nav-item d-flex align-items-center gap-2">
          <Icon name="mdi:clipboard-list" />
          Inventory
        </NuxtLink>
      </ul>
    </aside>

    <!-- 🔹 MOBILE OFFCANVAS -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="sidebarMenu">
      <div class="offcanvas-header">
        <h5 class="fw-bold text-orange">Admin</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>

      <div class="offcanvas-body">
        <ul class="nav flex-column gap-2">
          <NuxtLink to="/admin" class="nav-item d-flex align-items-center gap-2" data-bs-dismiss="offcanvas">
            <Icon name="mdi:view-dashboard" />
            Dashboard
          </NuxtLink>

          <NuxtLink to="/admin/bookings" class="nav-item d-flex align-items-center gap-2" data-bs-dismiss="offcanvas">
            <Icon name="mdi:calendar-check" />
            Bookings
          </NuxtLink>

          <NuxtLink to="/admin/rooms" class="nav-item d-flex align-items-center gap-2" data-bs-dismiss="offcanvas">
            <Icon name="mdi:bed" />
            Rooms
          </NuxtLink>

          <NuxtLink to="/admin/inventory" class="nav-item d-flex align-items-center gap-2" data-bs-dismiss="offcanvas">
            <Icon name="mdi:clipboard-list" />
            Inventory
          </NuxtLink>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 240px;
  min-height: 100vh;
  background: #fff;
  border-right: 1px solid #eee;
}

/* Nav item */
.nav-item {
  padding: 10px 12px;
  border-radius: 10px;
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: 0.2s;
}

/* Hover */
.nav-item:hover {
  background: #f5f5f5;
}

/* Active */
.router-link-active {
  background: #ffe9e0;
  color: #ff6b2c;
  font-weight: 500;
}

/* Icon size */
.nav-item :deep(svg) {
  font-size: 20px;
}
</style>