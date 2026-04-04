<template>
  <div class="container-fluid py-4">
    <h3 class="mb-4 fw-bold">Inventory</h3>

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
              <th>Guests</th>
              <th>Videoke</th>
              <th>Amount</th>
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
              <td>{{ item.guests }}</td>
              <td>
                <span
                  class="badge"
                  :class="item.videoke ? 'bg-success' : 'bg-secondary'"
                >
                  {{ item.videoke ? 'Yes' : 'No' }}
                </span>
              </td>
              <td class="fw-bold text-success">
                ₱{{ item.amount.toLocaleString() }}
              </td>
            </tr>

            <tr v-if="filteredInventory.length === 0">
              <td colspan="7" class="text-center py-3">
                No records found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ✅ Modal -->
    <AddBookingModal @save="handleSave" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import AddBookingModal from "@/components/admin/AddBookingModal.vue";

definePageMeta({
  layout: "admin",
});

// 🔥 CLEAN Bootstrap leftovers (SSR SAFE)
const cleanModalArtifacts = () => {
  if (import.meta.client) {
    document.body.classList.remove("modal-open");

    const backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach((el) => el.remove());
  }
};

// ✅ run on enter
onMounted(() => {
  cleanModalArtifacts();
});

// ✅ run on leave
onUnmounted(() => {
  cleanModalArtifacts();
});

// 🔍 Search
const search = ref("");

// 📦 Data
const inventory = ref([
  {
    id: 1,
    name: "Juan Dela Cruz",
    address: "Cebu City",
    cabin: "Talisay Cabin",
    date: "Apr 3, 2026",
    guests: 5,
    videoke: true,
    amount: 3000,
  },
  {
    id: 2,
    name: "Maria Santos",
    address: "Lapu-Lapu City",
    cabin: "Malobago Cabin",
    date: "Apr 2, 2026",
    guests: 3,
    videoke: false,
    amount: 1800,
  },
]);

// 🔎 Filter
const filteredInventory = computed(() => {
  return inventory.value.filter((item) =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

// 💾 Save booking
const handleSave = (data) => {
  const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  inventory.value.push({
    id: Date.now(),
    ...data,
    date: formattedDate,
  });
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