<template>
  <div class="modal fade" id="addBookingModal" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg rounded-4">

        <!-- 🔥 HEADER -->
        <div class="modal-header border-0 pb-0">
          <h5 class="modal-title fw-bold d-flex align-items-center gap-2">
            <Icon name="mdi:clipboard-plus" />
            Add Booking
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- 🔥 BODY -->
        <div class="modal-body pt-2">

          <!-- 👤 Guest Info -->
          <h6 class="text-muted mb-3 fw-semibold">Guest Information</h6>

          <div class="row g-3 mb-4">
            <div class="col-md-6">
              <label class="form-label">Name</label>
              <input v-model="form.name" type="text" class="form-control form-control-lg" />
            </div>

            <div class="col-md-6">
              <label class="form-label">Address</label>
              <input v-model="form.address" type="text" class="form-control form-control-lg" />
            </div>
          </div>

          <!-- 🏕 Booking Info -->
          <h6 class="text-muted mb-3 fw-semibold">Booking Details</h6>

          <div class="row g-3 mb-4">
            <div class="col-md-6">
              <label class="form-label">Cabin</label>
              <select v-model="form.cabin" class="form-select form-select-lg">
                <option>Talisay Cabin</option>
                <option>Malobago Cabin</option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label">Date</label>
              <input v-model="form.date" type="date" class="form-control form-control-lg" />
            </div>

            <div class="col-md-6">
              <label class="form-label">Guests</label>
              <input v-model="form.guests" type="number" class="form-control form-control-lg" />
            </div>

            <div class="col-md-6">
              <label class="form-label">Videoke</label>
              <select v-model="form.videoke" class="form-select form-select-lg">
                <option :value="true">🎤 Yes</option>
                <option :value="false">No</option>
              </select>
            </div>
          </div>

          <!-- 💰 PRICE BREAKDOWN -->
          <div class="amount-box p-3 rounded-3">

            <!-- Cabin -->
            <div class="d-flex justify-content-between">
              <span>Cabin</span>
              <span>
                ₱{{ form.cabin === "Talisay Cabin" ? "4,500" : "4,000" }}
              </span>
            </div>

            <!-- Videoke -->
            <div v-if="form.videoke" class="d-flex justify-content-between">
              <span>Videoke</span>
              <span>+ ₱500</span>
            </div>

            <!-- Weekend / Holiday -->
            <div
              v-if="form.date && (isWeekend(form.date) || isHoliday(form.date))"
              class="d-flex justify-content-between text-warning"
            >
              <span>Weekend / Holiday</span>
              <span>+ ₱500</span>
            </div>

            <hr />

            <!-- Total -->
            <div class="d-flex justify-content-between fw-bold fs-5 text-success">
              <span>Total</span>
              <span>₱{{ totalAmount.toLocaleString() }}</span>
            </div>

          </div>

        </div>

        <!-- 🔥 FOOTER -->
        <div class="modal-footer border-0 pt-0">
          <button class="btn btn-light px-4" data-bs-dismiss="modal">
            Cancel
          </button>
          <button class="btn btn-primary px-4 d-flex align-items-center gap-2" @click="submit">
            <Icon name="mdi:content-save" />
            Save Booking
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const emit = defineEmits(["save"]);

const form = ref({
  name: "",
  address: "",
  cabin: "Talisay Cabin",
  date: "",
  guests: 1,
  videoke: false,
});

// 🔥 Weekend checker
const isWeekend = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  return day === 0 || day === 6;
};

// 🔥 Philippine holidays (sample)
const holidays = [
  "2026-01-01",
  "2026-04-09",
  "2026-06-12",
  "2026-12-25",
];

const isHoliday = (date) => {
  return holidays.includes(date);
};

// 💰 Computed pricing
const totalAmount = computed(() => {
  let base = 0;

  if (form.value.cabin === "Talisay Cabin") base = 4500;
  if (form.value.cabin === "Malobago Cabin") base = 4000;

  if (form.value.videoke) base += 500;

  if (form.value.date) {
    if (isWeekend(form.value.date) || isHoliday(form.value.date)) {
      base += 500;
    }
  }

  return base;
});

// 🔥 Bootstrap modal instance
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
  modalInstance?.hide();
};

// ✅ Submit
const submit = () => {
  emit("save", {
    ...form.value,
    amount: totalAmount.value,
  });

  // reset
  form.value = {
    name: "",
    address: "",
    cabin: "Talisay Cabin",
    date: "",
    guests: 1,
    videoke: false,
  };

  closeModal();
};
</script>

<style scoped>
.modal-content {
  background: #fff;
}

.amount-box {
  background: #f8fafc;
  border: 1px dashed #ddd;
}

.form-control,
.form-select {
  border-radius: 10px;
}

.form-control:focus,
.form-select:focus {
  border-color: #ff6b2c;
  box-shadow: 0 0 0 0.15rem rgba(255, 107, 44, 0.2);
}
</style>