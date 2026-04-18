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
              <th>Status</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="loading">
              <td colspan="10" class="text-center py-4">
                <div class="spinner-border text-primary"></div>
              </td>
            </tr>

            <tr
              v-else-if="inventory.length > 0"
              v-for="item in inventory"
              :key="item.id"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.address }}</td>
              <td class="fw-semibold text-muted">{{ item.cabin }}</td>

              <td>
                <div class="d-flex flex-column" style="font-size: 13px;">
                  <div class="fw-semibold">
                    {{ formatFullDate(item.start_datetime) }}
                    <span v-if="isOvernight(item)">
                      → {{ formatFullDate(item.end_datetime) }}
                    </span>
                  </div>
                  <div class="text-muted" style="font-size: 12px;">
                    {{ formatTime(item.start_datetime) }}
                    →
                    {{ formatTime(item.end_datetime) }}
                  </div>
                </div>
              </td>

              <td>{{ item.guests }}</td>

              <td>
                <span
                  class="badge"
                  :class="item.videoke ? 'bg-success' : 'bg-secondary'"
                >
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
                <span
                  :class="getBalance(item) === 0 ? 'text-success' : 'text-danger'"
                >
                  ₱{{ formatMoney(getBalance(item)) }}
                </span>
              </td>

              <td>
                <span
                  class="badge"
                  :class="getStatusClass(item)"
                >
                  {{ getStatusLabel(item) }}
                </span>
              </td>

              <td class="text-center">
                <div class="d-flex justify-content-center gap-2">

                  <button
                    class="btn btn-light border"
                    @click="editItem(item)"
                    data-bs-toggle="modal"
                    data-bs-target="#addBookingModal"
                  >
                    <Icon name="mdi:pencil" size="18" />
                  </button>

                  <button
                    class="btn btn-light border text-danger"
                    @click="deleteItem(item.id)"
                  >
                    <Icon name="mdi:delete" size="18" />
                  </button>

                  <button
                    class="btn btn-light border text-warning"
                    @click="addPayment(item)"
                  >
                    <Icon name="mdi:cash-plus" size="18" />
                  </button>

                </div>
              </td>
            </tr>

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
import { ref, onMounted, nextTick } from "vue";
import axios from "axios";
import AddBookingModal from "@/components/admin/AddBookingModal.vue";
import PaymentModal from "@/components/admin/PaymentModal.vue";

definePageMeta({ layout: "admin" });

const { $bootstrap } = useNuxtApp();

const API_URL = "http://127.0.0.1:8000/api";

/* STATE */
const inventory = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);
const loading = ref(false);

const search = ref("");
const status = ref("");

let debounceTimeout = null;

/* FETCH */
const fetchBookings = async (page = 1) => {
  loading.value = true;

  try {
    const res = await axios.get(`${API_URL}/bookings`, {
      params: { page, search: search.value, status: status.value },
    });

    inventory.value = res.data.data || [];
    currentPage.value = res.data.current_page || 1;
    lastPage.value = res.data.last_page || 1;

  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchBookings);

/* SEARCH */
const handleSearch = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => fetchBookings(1), 400);
};

/* DATETIME */
const toServerDateTime = (dt) => {
  if (!dt) return null;
  const d = new Date(dt);
  if (isNaN(d)) return null;

  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}:00`;
};

const parseLocal = (dt) => {
  if (!dt) return null;
  return new Date(dt.replace("T"," ").replace("Z",""));
};

/* FORMAT */
const formatFullDate = (dt) => {
  const d = parseLocal(dt);
  if (!d) return "";

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
const formatTime = (dt) => parseLocal(dt)?.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"}) || "";

const isOvernight = (i) => {
  const s = parseLocal(i.start_datetime);
  const e = parseLocal(i.end_datetime);
  return s && e && s.toDateString() !== e.toDateString();
};

/* HELPERS */
const formatMoney = (v) => Number(v || 0).toLocaleString();
const getBalance = (i) => (i.amount || 0) - (i.paid || 0);

const getPaymentStatus = (i) =>
  (i.paid || 0) >= (i.amount || 0)
    ? "Fully Paid"
    : "Partially Paid";

const getPaymentStatusClass = (i) =>
  (i.paid || 0) >= (i.amount || 0)
    ? "bg-success"
    : "bg-warning text-dark";

    const getStatusLabel = (i) => {
  if (i.status === "cancelled") return "Cancelled";
  return "Confirmed";
};

const getStatusClass = (i) => {
  if (i.status === "cancelled") {
    return "bg-danger-subtle text-danger";
  }
  return "bg-success-subtle text-success";
};
/* ACTIONS */
const selectedItem = ref(null);
const selectedPaymentItem = ref(null);

const openAdd = () => (selectedItem.value = null);
const editItem = (i) => (selectedItem.value = { ...i });

const addPayment = async (i) => {
  selectedPaymentItem.value = i;

  await nextTick();

  const el = document.getElementById("paymentModal");
  if (!el) return;

  const modal = new $bootstrap.Modal(el);
  modal.show();
};

/* PAYMENT */
const handlePaymentConfirm = async (amount) => {
  await axios.post(
    `${API_URL}/bookings/${selectedPaymentItem.value.id}/payment`,
    { amount }
  );

  fetchBookings(currentPage.value);
};

/* SAVE */
const handleSave = async (data) => {
  const payload = {
    ...data,
    start_datetime: toServerDateTime(data.start_datetime),
    end_datetime: toServerDateTime(data.end_datetime),
    paid: data.paid ?? 0,
    status: data.status ?? "confirmed",
  };

  try {
    if (selectedItem.value) {
      await axios.put(`${API_URL}/bookings/${selectedItem.value.id}`, payload);
    } else {
      await axios.post(`${API_URL}/bookings`, payload);
    }

    fetchBookings(currentPage.value);
  } catch (err) {
    alert(err.response?.data?.message || "Error saving");
  }
};

/* DELETE */
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
</style>