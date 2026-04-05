<template>
  <div class="">
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
            <tr v-for="item in filteredInventory" :key="item.id">
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
                  {{ item.videoke ? 'Yes' : 'No' }}
                </span>
              </td>

              
              <!-- PAYMENT STATUS -->
              <td>
                <span
                class="badge"
                  :class="getPaymentStatusClass(item)"
                  >
                  {{ getPaymentStatus(item) }}
                </span>
              </td>
              
              <!-- BALANCE -->
              <td>
                <span
                class="fw-bold"
                :class="getBalance(item) === 0 ? 'text-success' : 'text-danger'"
                >
                ₱{{ getBalance(item).toLocaleString() }}
              </span>
            </td>
            
            <td class="fw-bold text-success">
              ₱{{ item.amount.toLocaleString() }}
            </td>
              <!-- ACTIONS -->
              <td class="text-center">
                <!-- Edit -->
               <button
                  class="btn btn-sm btn-outline-primary me-2"
                  @click="editItem(item)"
                  data-bs-toggle="modal"
                  data-bs-target="#addBookingModal"
                >
                  <span
                    data-bs-toggle="tooltip"
                    title="Edit Booking"
                  >
                    <Icon name="mdi:pencil" />
                  </span>
                </button>

                <!-- Delete -->
                <button
                  class="btn btn-sm btn-outline-danger me-2"
                  @click="deleteItem(item.id)"
                  data-bs-toggle="tooltip"
                  title="Delete Booking"
                >
                  <Icon name="mdi:delete" />
                </button>


                <!-- Add Payment -->
                <button
                  class="btn btn-sm btn-warning"
                  @click="addPayment(item)"
                  data-bs-toggle="tooltip"
                  title="Add Payment"

                >
                  <Icon name="mdi:cash-plus" />
                </button>
              </td>
            </tr>

            <tr v-if="filteredInventory.length === 0">
              <td colspan="11" class="text-center py-3">
                No records found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <AddBookingModal
      :editData="selectedItem"
      @save="handleSave"
    />
    <PaymentModal
      :item="selectedPaymentItem"
      @confirm="handlePaymentConfirm"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AddBookingModal from "@/components/admin/AddBookingModal.vue";
import PaymentModal from "@/components/admin/PaymentModal.vue";
definePageMeta({
  layout: "admin",
});

const search = ref("");
const selectedItem = ref(null);
const selectedPaymentItem = ref(null);
const { $bootstrap } = useNuxtApp();

// DATA
const inventory = ref([
  {
    id: 1,
    name: "Juan Dela Cruz",
    address: "Cebu City",
    cabin: "Talisay Cabin",
    date: "Apr 3, 2026",
    time: "8:00 AM - 5:00 PM",
    guests: 5,
    videoke: true,
    amount: 3000,
    paid: 1000,
  },
  {
    id: 2,
    name: "Maria Santos",
    address: "Naga City",
    cabin: "Malobago Cabin",
    date: "Apr 5, 2026",
    time: "8:00 AM - 5:00 PM",
    guests: 8,
    videoke: false,
    amount: 4000,
    paid: 4000,
  },
]);

// FILTER
const filteredInventory = computed(() => {
  return inventory.value.filter((item) =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

// PAYMENT STATUS
const getPaymentStatus = (item) => {
  if (item.paid >= item.amount) return "Fully Paid";
  return "Partially Paid";
};

const getPaymentStatusClass = (item) => {
  if (item.paid >= item.amount) return "bg-success";
  return "bg-warning text-dark";
};

// BALANCE
const getBalance = (item) => {
  return item.amount - item.paid;
};




const addPayment = (item) => {
  selectedPaymentItem.value = item;

  const modal = new $bootstrap.Modal(
    document.getElementById("paymentModal")
  );

  modal.show();
};

const handlePaymentConfirm = (amount) => {
  selectedPaymentItem.value.paid += amount;

  if (selectedPaymentItem.value.paid > selectedPaymentItem.value.amount) {
    selectedPaymentItem.value.paid =
      selectedPaymentItem.value.amount;
  }

  // close modal
  const modalEl = document.getElementById("paymentModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();
};

// ADD / EDIT / DELETE
const openAdd = () => {
  selectedItem.value = null;
};

const editItem = (item) => {
  selectedItem.value = { ...item };
};

const deleteItem = (id) => {
  if (confirm("Are you sure you want to delete this booking?")) {
    inventory.value = inventory.value.filter((item) => item.id !== id);
  }
};

const handleSave = (data) => {
  const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (selectedItem.value) {
    const index = inventory.value.findIndex(
      (i) => i.id === selectedItem.value.id
    );

    if (index !== -1) {
      inventory.value[index] = {
        ...inventory.value[index],
        ...data,
        date: formattedDate,
      };
    }
  } else {
    inventory.value.push({
      id: Date.now(),
      ...data,
      date: formattedDate,
      paid: data.paid || 0, // default 0 if not provided
    });
  }

  selectedItem.value = null;
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