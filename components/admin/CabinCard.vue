<template>
  <div class="col-md-6">
    <div class="card h-100 border-0 shadow-sm">

      <div class="card-header fw-semibold">
        {{ cabin }}
      </div>

      <div class="card-body">

        <!-- CHECK-IN -->
        <div class="mb-3">
          <div class="text-muted small">Check-in</div>

          <div v-if="checkIn" class="fw-semibold">
            {{ checkIn.guest_name }}
            <div class="small text-muted">
              {{ formatTime(checkIn.start_datetime) }}
            </div>
          </div>

          <div v-else class="text-muted small">No check-in</div>
        </div>

        <!-- CHECK-OUT -->
        <div>
          <div class="text-muted small">Check-out</div>

          <div v-if="checkOut" class="fw-semibold">
            {{ checkOut.guest_name }}
            <div class="small text-muted">
              {{ formatTime(checkOut.end_datetime) }}
            </div>
          </div>

          <div v-else class="text-muted small">No check-out</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cabin: String,
  checkIn: Object,
  checkOut: Object,
  formatTime: Function
})
</script>