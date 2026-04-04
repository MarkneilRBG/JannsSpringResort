<template>
  <div class="card p-3">
    <h6>Room Status</h6>

    <div class="room-grid mt-3">
      <div v-for="n in 40" :key="n" :class="getClass(n)">
        {{ n }}
      </div>
    </div>
  </div>
</template>

<script setup>
const getClass = (n) => {
  if (n % 7 === 0) return 'room booked'
  if (n % 5 === 0) return 'room cancelled'
  if (n % 3 === 0) return 'room pending'
  return 'room available'
}
</script>

<style scoped>
.room-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
}

.room {
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  font-weight: bold;
}

.available { background: #eee; }
.booked { background: #28a745; color: white; }
.pending { background: #ffc107; }
.cancelled { background: #dc3545; color: white; }
</style>