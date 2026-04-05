<template>
  <div class="modal fade" id="paymentModal" tabindex="-1">
    
    <!-- FIXED: removed modal-dialog-centered -->
    <div class="modal-dialog modal-sm" style="margin-top: 80px;">
      
      <div class="modal-content rounded-4 border-0 shadow">

        <!-- Header -->
        <div class="modal-header px-3 py-2 border-bottom bg-white rounded-top-4">
          <h6 class="fw-bold mb-0">Add Payment</h6>
          <button class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- Body -->
        <div class="modal-body px-3 pt-2 pb-3">

          <!-- Balance Card -->
          <div class="bg-light rounded-3 p-2 mb-2">
            <div class="text-muted small">Remaining Balance</div>
            <div class="fw-bold text-danger" style="font-size: 1.2rem;">
              ₱ {{ balance.toLocaleString() }}
            </div>
          </div>

          <!-- Input -->
          <input
            v-model="amount"
            type="number"
            class="form-control mb-2"
            placeholder="Enter amount"
          />

          <!-- Pay Full -->
          <button
            class="btn btn-outline-success w-100"
            @click="fillFull"
          >
            Pay Full
          </button>

        </div>

        <!-- Footer -->
        <div class="modal-footer border-0 px-3 pb-3 pt-0 d-flex justify-content-end gap-2">
          <button class="btn btn-light" data-bs-dismiss="modal">
            Cancel
          </button>

          <button class="btn btn-primary" @click="submit">
            Confirm
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  item: Object
});

const emit = defineEmits(["confirm"]);

const amount = ref("");

// computed balance
const balance = computed(() => {
  if (!props.item) return 0;
  return props.item.amount - props.item.paid;
});

// reset input when changing item
watch(() => props.item, () => {
  amount.value = "";
});

// autofill full payment
const fillFull = () => {
  amount.value = balance.value;
};

// submit payment
const submit = () => {
  const payment = Number(amount.value);

  if (!payment || payment <= 0) {
    alert("Invalid amount");
    return;
  }

  emit("confirm", payment);
};
</script>

<style scoped>
.modal-content {
  animation: fadeInUp 0.2s ease;
}

/* safer animation (no clipping) */
@keyframes fadeInUp {
  from {
    transform: translateY(5px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>