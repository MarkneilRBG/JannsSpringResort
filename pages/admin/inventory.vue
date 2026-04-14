<template>
  <div>
    <h4 class="mb-3 fw-bold">Inventory</h4>

    <!-- Filters -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <input
        v-model="search"
        type="text"
        class="form-control w-25"
        placeholder="Search name..."
      />

      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addBookingModal"
        @click="openAdd"
      >
        + Add Booking
      </button>
    </div>

    <!-- Table -->
    <div class="card shadow-sm border-0">
      <div class="card-body p-0">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Cabin</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Videoke</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Balance</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <!-- 🔄 LOADING -->
            <tr v-if="loading">
              <td colspan="11" class="text-center py-4">
                <div class="spinner-border text-primary"></div>
                <div class="mt-2 text-muted">Loading bookings...</div>
              </td>
            </tr>

            <!-- ✅ DATA -->
            <tr
              v-else-if="filteredInventory.length > 0"
              v-for="item in filteredInventory"
              :key="item.id"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.address }}</td>

              <td>
                <span class="badge bg-info text-dark">
                  {{ item.cabin }}
                </span>
              </td>

              <td>{{ item.date }}</td>

              <td>
                <span class="badge bg-warning text-dark">
                  {{ item.time }}
                </span>
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

              <!-- Amount -->
              <td class="fw-bold text-success">
                ₱{{ formatMoney(item.amount) }}
              </td>

              <!-- Payment -->
              <td>
                <span class="badge" :class="getPaymentStatusClass(item)">
                  {{ getPaymentStatus(item) }}
                </span>
              </td>

              <!-- Balance -->
              <td>
                <span
                  class="fw-bold"
                  :class="getBalance(item) === 0 ? 'text-success' : 'text-danger'"
                >
                  ₱{{ formatMoney(getBalance(item)) }}
                </span>
              </td>

              <!-- Actions -->
              <td class="text-center">
                <!-- Edit -->
                <button
                  class="btn btn-sm btn-outline-primary me-2"
                  @click="editItem(item)"
                  data-bs-toggle="modal"
                  data-bs-target="#addBookingModal"
                >
                  <Icon name="mdi:pencil" size="18" />
                </button>

                <!-- Delete -->
                <button
                  class="btn btn-sm btn-outline-danger me-2"
                  @click="deleteItem(item.id)"
                  :disabled="deleting === item.id"
                >
                  <span
                    v-if="deleting === item.id"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  <Icon v-else name="mdi:delete" size="18" />
                </button>

                <!-- Payment -->
                <button
                  class="btn btn-sm btn-warning"
                  @click="addPayment(item)"
                  :disabled="paying"
                >
                  <span
                    v-if="paying"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  <Icon v-else name="mdi:cash-plus" size="18" />
                </button>
              </td>
            </tr>

            <!-- EMPTY -->
            <tr v-else>
              <td colspan="11" class="text-center py-3">
                No records found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modals -->
    <AddBookingModal :editData="selectedItem" @save="handleSave" />
    <PaymentModal :item="selectedPaymentItem" @confirm="handlePaymentConfirm" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import AddBookingModal from "@/components/admin/AddBookingModal.vue";
import PaymentModal from "@/components/admin/PaymentModal.vue";

definePageMeta({
  layout: "admin",
});

const { $bootstrap } = useNuxtApp();

const API_URL = "http://127.0.0.1:8000/api";

const search = ref("");
const inventory = ref([]);
const selectedItem = ref(null);
const selectedPaymentItem = ref(null);

// 🔥 loading states
const loading = ref(false);
const saving = ref(false);
const deleting = ref(null);
const paying = ref(false);

// =============================
// FETCH
// =============================
const fetchBookings = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`${API_URL}/bookings`);
    inventory.value = res.data.data;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchBookings);

// =============================
// FILTER
// =============================
const filteredInventory = computed(() => {
  return inventory.value.filter((item) =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

// =============================
// HELPERS
// =============================
const formatMoney = (value) => {
  return Number(value).toLocaleString();
};

const getPaymentStatus = (item) => {
  return item.paid >= item.amount ? "Fully Paid" : "Partially Paid";
};

const getPaymentStatusClass = (item) => {
  return item.paid >= item.amount
    ? "bg-success"
    : "bg-warning text-dark";
};

const getBalance = (item) => item.amount - item.paid;

// =============================
// MODALS
// =============================
const openAdd = () => {
  selectedItem.value = null;
};

const editItem = (item) => {
  selectedItem.value = { ...item };
};

const addPayment = (item) => {
  selectedPaymentItem.value = item;

  const modal = new $bootstrap.Modal(
    document.getElementById("paymentModal")
  );
  modal.show();
};

// =============================
// PAYMENT
// =============================
const handlePaymentConfirm = async (amount) => {
  paying.value = true;

  try {
    const res = await axios.post(
      `${API_URL}/bookings/${selectedPaymentItem.value.id}/payment`,
      { amount }
    );

    selectedPaymentItem.value.paid = res.data.data.paid;

    const modal = $bootstrap.Modal.getInstance(
      document.getElementById("paymentModal")
    );
    modal.hide();

  } catch (err) {
    alert(err.response?.data?.message || "Payment failed");
  } finally {
    paying.value = false;
  }
};

// =============================
// CREATE / UPDATE
// =============================
const handleSave = async (data) => {
  saving.value = true;

  try {
    let res;

    data.date = new Date(data.date).toISOString().split("T")[0];

    if (selectedItem.value) {
      res = await axios.put(
        `${API_URL}/bookings/${selectedItem.value.id}`,
        data
      );

      const index = inventory.value.findIndex(
        (i) => i.id === selectedItem.value.id
      );

      if (index !== -1) {
        inventory.value[index] = res.data.data;
      }

    } else {
      res = await axios.post(`${API_URL}/bookings`, data);
      inventory.value.unshift(res.data.data);
    }

  } catch (err) {
    alert(err.response?.data?.message || "Save failed");
  } finally {
    saving.value = false;
  }
};

// =============================
// DELETE
// =============================
const deleteItem = async (id) => {
  if (!confirm("Delete this booking?")) return;

  deleting.value = id;

  try {
    await axios.delete(`${API_URL}/bookings/${id}`);

    inventory.value = inventory.value.filter(
      (item) => item.id !== id
    );

  } catch (err) {
    alert("Delete failed");
  } finally {
    deleting.value = null;
  }
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