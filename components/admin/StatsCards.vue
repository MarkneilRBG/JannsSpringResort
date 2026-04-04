<template>
  <div class="row g-3">

    <div class="col-md-6 col-lg-6" v-for="card in cards" :key="card.label">
      <div class="stat-card d-flex align-items-center p-3">

        <!-- ICON -->
        <div class="icon-box me-3" :style="{ background: card.bg }">
          <Icon :name="card.icon" size="1.3em" :style="{ color: card.color }" />
        </div>

        <!-- TEXT -->
        <div>
          <div class="stat-value">{{ card.value }}</div>
          <div class="stat-label">{{ card.label }}</div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
const cards = [
  {
    label: "Booked Rooms",
    value: 570,
    icon: "mdi:bed",
    color: "#10b981",
    bg: "#ecfdf5"
  },
  {
    label: "Pending",
    value: 204,
    icon: "mdi:clock-outline",
    color: "#f59e0b",
    bg: "#fffbeb"
  },
  {
    label: "Cancelled",
    value: 18,
    icon: "mdi:close-circle-outline",
    color: "#ef4444",
    bg: "#fef2f2"
  },
  {
    label: "Revenue",
    value: "$4350",
    icon: "mdi:cash-multiple",
    color: "#3b82f6",
    bg: "#eff6ff"
  }
]
</script>

<style scoped>
.stat-card {
  background: white;
  border-radius: 14px;
  border: 1px solid #f1f1f1;
  transition: 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}

/* ICON */
.icon-box {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* TEXT */
.stat-value {
  font-size: 20px;
  font-weight: 700;
}

.stat-label {
  font-size: 13px;
  color: #6b7280;
}
</style>