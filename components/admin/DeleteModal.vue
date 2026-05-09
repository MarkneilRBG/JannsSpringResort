<template>
  <BaseModal id="deleteModal">

    <!-- TITLE -->
    <template #title>
      <span class="text-danger">
        <Icon name="mdi:alert-circle" /> Delete Booking
      </span>
    </template>

    <!-- BODY -->
    <div class="text-center">
      <Icon name="mdi:trash-can-outline" size="50" class="text-danger mb-2" />

      <p>Are you sure you want to delete this booking?</p>

      <h6 class="fw-bold">{{ item?.name }}</h6>
      <small class="text-muted">This cannot be undone</small>
    </div>

    <!-- FOOTER -->
    <template #footer>
      <button class="btn btn-light" @click="closeModal">
        Cancel
      </button>

      <button
        class="btn btn-danger"
        :disabled="loading"
        @click="confirmDelete"
      >
        <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
        Delete
      </button>
    </template>

  </BaseModal>
</template>

<script setup>
import BaseModal from "@/components/ui/BaseModal.vue";
import { ref } from "vue";
import { useModal } from "@/composables/useModal";

const props = defineProps({ item: Object });
const emit = defineEmits(["confirm"]);

const loading = ref(false);
const { close } = useModal();

const confirmDelete = async () => {
  loading.value = true;
  await emit("confirm", props.item);
  loading.value = false;
};

const closeModal = () => close("deleteModal");
</script>