<template>
  <span><h4 class="mb-3 fw-bold">Rooms</h4></span>
  <div class="container-fluid py-4 px-4">
    
    <div class="row">

      <!-- LEFT: Rooms List -->
      <div class="col-md-8">
        <div class="card shadow-sm border-0 rounded-4 p-4">

          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="fw-bold mb-0">Rooms List</h5>

            <input
              v-model="search"
              type="text"
              class="form-control form-control-sm"
              style="max-width: 280px;"
              placeholder="Search room..."
            />
          </div>

          <table class="table align-middle" style="table-layout: fixed;">
            <thead class="text-muted small">
              <tr>
                <th style="width: 90px;">Image</th>
                <th>Room</th>
                <th style="width: 130px;">Price</th>
                <th style="width: 80px;" class="text-center">Max Pax</th>
                <th style="width: 120px;">Status</th>
                <th style="width: 180px;">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="room in filteredRooms" :key="room.id">

                <td>
                  <img
                    :src="room.image"
                    style="width: 70px; height: 55px; object-fit: cover; border-radius: 8px;"
                  />
                </td>

                <td class="fw-semibold text-truncate">
                  {{ room.name }}
                </td>

                <td>
                  ₱ {{ room.price }} <small class="text-muted">/ night</small>
                </td>

                <td class="text-center">
                  {{ room.maxPax }}
                </td>

                <td>
                  <span
                    class="badge"
                    :class="room.available ? 'bg-success' : 'bg-secondary'"
                  >
                    {{ room.available ? 'Available' : 'Maintenance' }}
                  </span>
                </td>

                <td>
                  <div class="d-flex align-items-center gap-1">
                    <button class="btn btn-sm btn-warning px-2" @click="editRoom(room)">
                      Edit
                    </button>

                    <button class="btn btn-sm btn-danger px-2" @click="deleteRoom(room.id)">
                      Delete
                    </button>

                    <button
                      class="btn btn-sm px-2"
                      :class="room.available ? 'btn-dark' : 'btn-success'"
                      @click="room.available = !room.available"
                    >
                      {{ room.available ? 'Disable' : 'Enable' }}
                    </button>
                  </div>
                </td>

              </tr>

              <tr v-if="filteredRooms.length === 0">
                <td colspan="6" class="text-center text-muted">
                  No rooms found
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

      <!-- RIGHT SIDE -->
      <div class="col-md-4">

        <!-- Add/Edit Room -->
        <div class="card shadow-sm border-0 rounded-4 p-4 mb-3">
          <h5 class="fw-bold mb-3">
            {{ isEdit ? "Edit Room" : "Add Room" }}
          </h5>

          <input v-model="form.name" class="form-control form-control-sm mb-2" placeholder="Room Name" />
          <input v-model="form.price" type="number" class="form-control form-control-sm mb-2" placeholder="Base Price" />
          <input v-model="form.maxPax" type="number" class="form-control form-control-sm mb-2" placeholder="Max Pax" />

          <!-- ✅ FILE UPLOAD -->
          <input
            type="file"
            class="form-control form-control-sm mb-3"
            accept="image/*"
            @change="handleImageUpload"
          />

          <!-- Preview -->
          <div v-if="form.image" class="mb-3 text-center">
            <img
              :src="form.image"
              style="width: 100%; height: 140px; object-fit: cover; border-radius: 10px;"
            />
          </div>

          <button class="btn btn-primary w-100 rounded-3" @click="saveRoom">
            {{ isEdit ? "Update Room" : "Add Room" }}
          </button>

          <button v-if="isEdit" class="btn btn-secondary w-100 mt-2" @click="resetForm">
            Cancel Edit
          </button>
        </div>

        <!-- Price Calculator -->
        <div class="card shadow-sm border-0 rounded-4 p-4">
          <h6 class="fw-bold mb-3">💡 Price Calculator</h6>

          <input v-model="calcGuests" type="number" class="form-control form-control-sm mb-2" placeholder="Guests" />

          <select v-model="selectedRoomId" class="form-select form-select-sm mb-3">
            <option disabled value="">Select Room</option>
            <option v-for="r in rooms" :key="r.id" :value="r.id">
              {{ r.name }}
            </option>
          </select>

          <div v-if="selectedRoom && calcGuests > selectedRoom.maxPax" class="text-danger small mb-2">
            +₱ {{ (calcGuests - selectedRoom.maxPax) * 100 }} extra
          </div>

          <div class="text-center mt-2">
            <h4 class="fw-bold text-primary">₱ {{ computedPrice }}</h4>
            <small class="text-muted">Total Price</small>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

definePageMeta({ layout: "admin" })

const rooms = ref([
  {
    id: 1,
    name: "Talisay Cabin",
    price: 1500,
    maxPax: 4,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    available: true
  }
])

const search = ref("")
const isEdit = ref(false)

const form = ref({
  id: null,
  name: "",
  price: "",
  maxPax: "",
  image: "",
  available: true
})

const handleImageUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return

  form.value.image = URL.createObjectURL(file)
}

const filteredRooms = computed(() =>
  rooms.value.filter(r => r.name.toLowerCase().includes(search.value.toLowerCase()))
)

const saveRoom = () => {
  if (!form.value.name || !form.value.price || !form.value.maxPax) return

  if (isEdit.value) {
    const i = rooms.value.findIndex(r => r.id === form.value.id)
    rooms.value[i] = { ...form.value }
  } else {
    form.value.id = Date.now()
    rooms.value.push({ ...form.value })
  }

  resetForm()
}

const editRoom = (room) => {
  isEdit.value = true
  form.value = { ...room }
}

const deleteRoom = (id) => {
  rooms.value = rooms.value.filter(r => r.id !== id)
}

const resetForm = () => {
  isEdit.value = false
  form.value = {
    id: null,
    name: "",
    price: "",
    maxPax: "",
    image: "",
    available: true
  }
}

const calcGuests = ref()
const selectedRoomId = ref("")

const selectedRoom = computed(() =>
  rooms.value.find(r => r.id === selectedRoomId.value)
)

const computedPrice = computed(() => {
  if (!selectedRoom.value) return 0
  const extra = Math.max(0, calcGuests.value - selectedRoom.value.maxPax)
  return selectedRoom.value.price + extra * 100
})
</script>