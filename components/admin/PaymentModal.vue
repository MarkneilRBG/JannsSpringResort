<template>
  <BaseModal id="paymentModal" size="modal-sm">

    <!-- TITLE -->
    <template #title>
      <span class="fw-bold">💳 Add Payment</span>
    </template>

    <!-- BODY -->
    <div>

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

    <!-- FOOTER -->
    <template #footer>
      <button class="btn btn-light" @click="closeModal">
        Cancel
      </button>

      <button
        class="btn btn-primary"
        :disabled="loading"
        @click="submit"
      >
        <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
        Confirm
      </button>
    </template>

  </BaseModal>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import { useModal } from "@/composables/useModal";

const props = defineProps({
  item: Object
});

const emit = defineEmits(["confirm"]);

const amount = ref("");
const loading = ref(false);

const { close } = useModal();

/* BALANCE */
const balance = computed(() => {
  if (!props.item) return 0;
  return (props.item.amount || 0) - (props.item.paid || 0);
});

/* RESET INPUT */
watch(() => props.item, () => {
  amount.value = "";
});

/* PAY FULL */
const fillFull = () => {
  amount.value = balance.value;
};

/* SUBMIT */
const submit = async () => {
  const payment = Number(amount.value);

  if (!payment || payment <= 0) {
    alert("Invalid amount");
    return;
  }

  loading.value = true;

  await emit("confirm", payment);

  loading.value = false;

  close("paymentModal");
};

/* CLOSE */
const closeModal = () => close("paymentModal");
</script>

<style scoped>
/* smooth animation */
.modal-content {
  animation: fadeInUp 0.2s ease;
}

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