<template>
  <div>
    <h4 class="mb-3 fw-bold">Inventory</h4>

    <!-- FILTERS -->
    <div class="d-flex align-items-center gap-2 mb-3">
      <input
        v-model="search"
        type="text"
        class="form-control"
        style="width: 250px; height: 42px;"
        placeholder="Search name, address..."
        @input="handleSearch"
      />

      <select
        v-model="status"
        class="form-select"
        style="width: 180px; height: 42px;"
        @change="fetchBookings(1)"
      >
        <option value="">All</option>
        <option value="paid">Fully Paid</option>
        <option value="unpaid">Unpaid</option>
      </select>

      <button
        class="btn btn-primary ms-auto"
        style="height: 42px;"
        data-bs-toggle="modal"
        data-bs-target="#addBookingModal"
        @click="openAdd"
      >
        + Add Booking
      </button>
    </div>

    <!-- TABLE -->
    <div class="card shadow-sm border-0">
      <div class="card-body p-0">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Cabin</th>
              <th>Schedule</th>
              <th>Guests</th>
              <th>Videoke</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Balance</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <!-- LOADING -->
            <tr v-if="loading">
              <td colspan="10" class="text-center py-4">
                <div class="spinner-border text-primary"></div>
              </td>
            </tr>

            <!-- DATA -->
            <tr v-else-if="inventory.length > 0" v-for="item in inventory" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.address }}</td>

              <!-- ✅ REMOVED BADGE -->
              <td class="fw-semibold text-muted">
                {{ item.cabin }}
              </td>

              <!-- ✅ CLEAN SCHEDULE -->
              <td>
                <div class="d-flex flex-column" style="font-size: 13px;">

                  <!-- DATE -->
                  <div class="d-flex align-items-center gap-1 fw-semibold">
                    <Icon name="mdi:calendar" size="14" />

                    <span>
                      {{ formatFullDate(item.start_datetime) }}

                      <span v-if="isOvernight(item)">
                        → {{ formatFullDate(item.end_datetime) }}
                      </span>
                    </span>

                    <span
                      v-if="isOvernight(item)"
                      class="badge bg-danger-subtle text-danger ms-2 px-2 py-1 d-inline-flex align-items-center gap-1"
                      style="font-size: 10px; border-radius: 6px;"
                    >
                      <Icon name="mdi:weather-night" size="10" />
                      
                    </span>
                  </div>

                  <!-- TIME -->
                  <div class="d-flex align-items-center gap-1 text-muted" style="font-size: 12px;">
                    <Icon name="mdi:clock-outline" size="14" />

                    <span>
                      {{ formatTime(item.start_datetime) }}
                      →
                      {{ formatTime(item.end_datetime) }}
                    </span>
                  </div>

                </div>
              </td>

              <td>{{ item.guests }}</td>

              <td>
                <span class="badge" :class="item.videoke ? 'bg-success' : 'bg-secondary'">
                  {{ item.videoke ? "Yes" : "No" }}
                </span>
              </td>

              <td class="fw-bold text-success">
                ₱{{ formatMoney(item.amount) }}
              </td>

              <td>
                <span class="badge" :class="getPaymentStatusClass(item)">
                  {{ getPaymentStatus(item) }}
                </span>
              </td>

              <td>
                <span :class="getBalance(item) === 0 ? 'text-success' : 'text-danger'">
                  ₱{{ formatMoney(getBalance(item)) }}
                </span>
              </td>

              <td class="text-center">
                <button
                  class="btn btn-sm btn-outline-primary me-2"
                  @click="editItem(item)"
                  data-bs-toggle="modal"
                  data-bs-target="#addBookingModal"
                >
                  <Icon name="mdi:pencil" size="18" />
                </button>

                <button
                  class="btn btn-sm btn-outline-danger me-2"
                  @click="deleteItem(item.id)"
                >
                  <Icon name="mdi:delete" size="18" />
                </button>

                <button
                  class="btn btn-sm btn-warning"
                  @click="addPayment(item)"
                >
                  <Icon name="mdi:cash-plus" size="18" />
                </button>
              </td>
            </tr>

            <!-- EMPTY -->
            <tr v-else>
              <td colspan="10" class="text-center py-3">
                No records found.
              </td>
            </tr>
          </tbody>
        </table>

        <!-- PAGINATION -->
        <div class="d-flex justify-content-between align-items-center p-3">
          <div class="text-muted small">
            Page {{ currentPage }} of {{ lastPage }}
          </div>

          <div class="btn-group">
            <button
              class="btn btn-sm btn-outline-secondary"
              :disabled="currentPage === 1"
              @click="fetchBookings(currentPage - 1)"
            >
              Prev
            </button>

            <button
              v-for="page in lastPage"
              :key="page"
              class="btn btn-sm"
              :class="page === currentPage ? 'btn-primary' : 'btn-outline-secondary'"
              @click="fetchBookings(page)"
            >
              {{ page }}
            </button>

            <button
              class="btn btn-sm btn-outline-secondary"
              :disabled="currentPage === lastPage"
              @click="fetchBookings(currentPage + 1)"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <AddBookingModal :editData="selectedItem" @save="handleSave" />
    <PaymentModal :item="selectedPaymentItem" @confirm="handlePaymentConfirm" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import AddBookingModal from "@/components/admin/AddBookingModal.vue";
import PaymentModal from "@/components/admin/PaymentModal.vue";

definePageMeta({ layout: "admin" });

const { $bootstrap } = useNuxtApp();

const API_URL = "http://127.0.0.1:8000/api";

const inventory = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);
const loading = ref(false);

const search = ref("");
const status = ref("");

let debounceTimeout = null;

const fetchBookings = async (page = 1) => {
  loading.value = true;

  try {
    const res = await axios.get(`${API_URL}/bookings`, {
      params: {
        page,
        search: search.value,
        status: status.value,
      },
    });

    inventory.value = res.data.data;
    currentPage.value = res.data.current_page;
    lastPage.value = res.data.last_page;

  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchBookings());

const handleSearch = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    fetchBookings(1);
  }, 400);
};

/* =========================
   🔥 FIXED DATETIME PARSER
========================= */
const parseLocal = (dt) => {
  if (!dt) return null;

  // remove UTC conversion
  const clean = dt.replace("T", " ").replace("Z", "").split(".")[0];
  return new Date(clean);
};

/* =========================
   FORMATTERS
========================= */
const formatFullDate = (dt) => {
  const d = parseLocal(dt);
  if (!d) return "";

  return d.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (dt) => {
  const d = parseLocal(dt);
  if (!d) return "";

  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* =========================
   🔥 OVERNIGHT DETECTION
========================= */
const isOvernight = (item) => {
  const start = parseLocal(item.start_datetime);
  const end = parseLocal(item.end_datetime);

  if (!start || !end) return false;

  return start.toDateString() !== end.toDateString();
};

/* =========================
   HELPERS
========================= */
const formatMoney = (v) => Number(v).toLocaleString();

const getBalance = (i) => i.amount - i.paid;

const getPaymentStatus = (i) =>
  i.paid >= i.amount ? "Fully Paid" : "Partially Paid";

const getPaymentStatusClass = (i) =>
  i.paid >= i.amount ? "bg-success" : "bg-warning text-dark";

/* =========================
   ACTIONS
========================= */
const selectedItem = ref(null);
const selectedPaymentItem = ref(null);

const openAdd = () => (selectedItem.value = null);
const editItem = (i) => (selectedItem.value = { ...i });

const addPayment = (i) => {
  selectedPaymentItem.value = i;
  new $bootstrap.Modal(document.getElementById("paymentModal")).show();
};

const handlePaymentConfirm = async (amount) => {
  await axios.post(
    `${API_URL}/bookings/${selectedPaymentItem.value.id}/payment`,
    { amount }
  );
  fetchBookings(currentPage.value);
};

const handleSave = async (data) => {
  if (selectedItem.value) {
    await axios.put(
      `${API_URL}/bookings/${selectedItem.value.id}`,
      data
    );
  } else {
    await axios.post(`${API_URL}/bookings`, data);
  }

  fetchBookings(currentPage.value);
};

const deleteItem = async (id) => {
  if (!confirm("Delete this booking?")) return;
  await axios.delete(`${API_URL}/bookings/${id}`);
  fetchBookings(currentPage.value);
};
</script>

<style scoped>
.card {
  border-radius: 12px;
}

table th,
table td {
  vertical-align: middle;
}

td small {
  font-size: 12px;
}
</style>