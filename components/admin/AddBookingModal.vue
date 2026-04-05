<template>
  <div class="modal fade" id="addBookingModal" tabindex="-1">
    <div class="modal-dialog modal-md modal-dialog-centered modal-fit">
      <div class="modal-content border-0 shadow rounded-4">

        <!-- HEADER -->
        <div class="modal-header border-0 pb-1">
          <h6 class="modal-title fw-semibold d-flex align-items-center gap-2">
            <Icon name="mdi:clipboard-plus" />
            Add Booking
          </h6>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- BODY -->
        <div class="modal-body pt-1">

          <!-- Guest Info -->
          <h6 class="text-muted mb-2 fw-semibold small">Guest Information</h6>

          <div class="row g-2 mb-3">
            <div class="col-md-6">
              <label class="form-label">Name</label>
              <input v-model="form.name" type="text" class="form-control form-control-sm" />
            </div>

            <div class="col-md-6">
              <label class="form-label">Address</label>
              <input v-model="form.address" type="text" class="form-control form-control-sm" />
            </div>
          </div>

          <!-- Booking Details -->
          <h6 class="text-muted mb-2 fw-semibold small">Booking Details</h6>

          <div class="row g-2 mb-3">
            <div class="col-md-6">
              <label class="form-label">Cabin</label>
              <select v-model="form.cabin" class="form-select form-select-sm">
                <option>Talisay Cabin</option>
                <option>Malobago Cabin</option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label">Date</label>
              <input v-model="form.date" type="date" class="form-control form-control-sm" />
            </div>

            <div class="col-md-6">
              <label class="form-label">Time</label>
              <select v-model="form.time" class="form-select form-select-sm">
                <option value="8:00 AM - 5:00 PM">Day (8 AM - 5 PM)</option>
                <option value="7:00 PM - 7:00 AM">Night (7 PM - 7 AM)</option>
                <option value="2:00 PM - 12:00 AM">Half Day (2 PM - 12 AM)</option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label">Guests</label>
              <input v-model="form.guests" type="number" class="form-control form-control-sm" />
            </div>

            <div class="col-md-6">
              <label class="form-label">Videoke</label>
              <select v-model="form.videoke" class="form-select form-select-sm">
                <option :value="true">Yes</option>
                <option :value="false">No</option>
              </select>
            </div>
          </div>

          <!-- PRICE -->
          <div class="amount-box p-2 rounded-3 small mb-2">

            <div class="d-flex justify-content-between">
              <span>Cabin</span>
              <span>
                ₱{{ form.cabin === "Talisay Cabin" ? "4,500" : "4,000" }}
              </span>
            </div>

            <div v-if="form.videoke" class="d-flex justify-content-between">
              <span>Videoke</span>
              <span>+ ₱500</span>
            </div>

            <div
              v-if="form.date && (isWeekend(form.date) || isHoliday(form.date))"
              class="d-flex justify-content-between text-warning"
            >
              <span>Weekend / Holiday</span>
              <span>+ ₱500</span>
            </div>

            <hr class="my-2" />

            <div class="d-flex justify-content-between fw-semibold text-success">
              <span>Total</span>
              <span>₱{{ totalAmount.toLocaleString() }}</span>
            </div>

          </div>

        </div>

        <!-- FOOTER -->
        <div class="modal-footer border-0 pt-1">
          <button class="btn btn-light btn-sm px-3" data-bs-dismiss="modal">
            Cancel
          </button>

          <button
            class="btn btn-primary btn-sm px-3 d-flex align-items-center gap-1"
            @click="submit"
          >
            <Icon name="mdi:content-save" />
            Save
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

const props = defineProps({
  editData: Object,
});

const emit = defineEmits(["save"]);

const form = ref({
  name: "",
  address: "",
  cabin: "Talisay Cabin",
  date: "",
  time: "8:00 AM - 5:00 PM",
  guests: 1,
  videoke: false,
});

// EDIT MODE
watch(
  () => props.editData,
  (val) => {
    if (val) {
      form.value = {
        ...val,
        date: new Date(val.date).toISOString().split("T")[0],
      };
    }
  },
  { immediate: true }
);

// Weekend
const isWeekend = (date) => {
  const d = new Date(date);
  return d.getDay() === 0 || d.getDay() === 6;
};

// Holidays
const holidays = [
  "2026-01-01",
  "2026-04-09",
  "2026-06-12",
  "2026-12-25",
];

const isHoliday = (date) => holidays.includes(date);

// Price
const totalAmount = computed(() => {
  let base = form.value.cabin === "Talisay Cabin" ? 4500 : 4000;

  if (form.value.videoke) base += 500;

  if (form.value.date && (isWeekend(form.value.date) || isHoliday(form.value.date))) {
    base += 500;
  }

  return base;
});

// Modal
let modalInstance = null;

onMounted(() => {
  if (import.meta.client) {
    const modalEl = document.getElementById("addBookingModal");
    if (modalEl && window.bootstrap) {
      modalInstance = new window.bootstrap.Modal(modalEl);
    }
  }
});

const closeModal = () => {
  const modalEl = document.getElementById("addBookingModal");

  if (modalEl) {
    // trigger fade out
    modalEl.classList.remove("show");

    // wait for animation (Bootstrap default = 300ms)
    setTimeout(() => {
      modalEl.style.display = "none";

      // remove backdrop AFTER animation
      document.querySelectorAll(".modal-backdrop").forEach(el => el.remove());

      document.body.classList.remove("modal-open");
      document.body.style = "";
    }, 300);
  }
};

// Submit
const submit = () => {
  emit("save", {
    ...form.value,
    amount: totalAmount.value,
  });

  form.value = {
    name: "",
    address: "",
    cabin: "Talisay Cabin",
    date: "",
    time: "8:00 AM - 5:00 PM",
    guests: 1,
    videoke: false,
  };

  closeModal();
};
</script>

<style scoped>
.modal-fit {
  max-width: 650px;
}

.modal-content {
  font-size: 14px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-body {
  overflow-y: auto;
  max-height: calc(90vh - 120px);
}

.form-label {
  font-size: 12.5px;
  margin-bottom: 3px;
}

.amount-box {
  background: #f8fafc;
  border: 1px dashed #ddd;
}

.form-control,
.form-select {
  border-radius: 8px;
}

.form-control:focus,
.form-select:focus {
  border-color: #ff6b2c;
  box-shadow: 0 0 0 0.1rem rgba(255, 107, 44, 0.2);
}

input[type="date"] {
  height: 32px !important;
  padding: 4px 8px !important;
  font-size: 13px;
}

input[type="number"] {
  height: 32px !important;
  padding: 4px 8px !important;
  font-size: 13px;
}
</style>