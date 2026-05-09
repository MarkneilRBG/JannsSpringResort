<template>
  <div class="modal fade" ref="modalRef" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">

        <!-- HEADER -->
        <div class="modal-header">
          <h5 class="modal-title">
            Attendance - {{ booking?.name }} ({{ booking?.cabin }})
          </h5>
          <button class="btn-close" @click="close"></button>
        </div>

        <!-- BODY -->
        <div class="modal-body">

          <!-- TABLE -->
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead class="table-light">
                <tr>
                  <th width="50">#</th>
                  <th>Guest Name</th>
                  <th width="80"></th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(row, i) in guests" :key="i">
                  <td>{{ i + 1 }}</td>
                  <td>
                    <input
                      v-model="row.name"
                      class="form-control"
                      placeholder="Enter name"
                      @keydown.enter.prevent="addRow"
                    />
                  </td>
                  <td>
                    <button
                      class="btn btn-sm btn-outline-danger w-100"
                      @click="removeRow(i)"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- ACTION -->
          <div class="d-flex justify-content-between">
            <button class="btn btn-outline-secondary" @click="addRow">
              + Add Row
            </button>

            <div class="fw-semibold">
              Total: {{ validGuests.length }}
            </div>
          </div>

        </div>

        <!-- FOOTER -->
        <div class="modal-footer">
          <button class="btn btn-light" @click="close">Cancel</button>

          <button
            class="btn btn-primary"
            :disabled="loading"
            @click="submit"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            Save Attendance
          </button>
        </div>

      </div>
    </div>
  </div>

  <!-- TOAST -->
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div ref="toastRef" class="toast text-bg-success border-0">
      <div class="d-flex">
        <div class="toast-body">
          {{ toastMessage }}
        </div>
        <button class="btn-close btn-close-white me-2 m-auto" @click="hideToast"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  booking: Object // 🔥 IMPORTANT
})

const emit = defineEmits(['close', 'saved'])

const { $bootstrap } = useNuxtApp()

const modalRef = ref(null)
const toastRef = ref(null)

let modalInstance = null
let toastInstance = null

const guests = ref([{ name: '' }])
const loading = ref(false)
const toastMessage = ref('')

/* INIT */
onMounted(() => {
  modalInstance = new $bootstrap.Modal(modalRef.value)
  modalInstance.show()

  toastInstance = new $bootstrap.Toast(toastRef.value)
})

onUnmounted(() => {
  modalInstance?.dispose()
  toastInstance?.dispose()
})

/* ACTIONS */
const close = () => {
  modalInstance?.hide()
  setTimeout(() => emit('close'), 200)
}

const addRow = () => guests.value.push({ name: '' })
const removeRow = (i) => guests.value.splice(i, 1)

/* TOAST */
const showToast = (msg) => {
  toastMessage.value = msg
  toastInstance?.show()
}

const hideToast = () => toastInstance?.hide()

/* COMPUTED */
const validGuests = computed(() =>
  guests.value.filter(g => g.name.trim())
)

/* SUBMIT */
const submit = async () => {
  if (!validGuests.value.length) return

  loading.value = true

  try {
    const res = await axios.post(
      'http://127.0.0.1:8000/api/attendance',
      {
        booking_id: props.booking.id, // 🔥 KEY CHANGE
        guests: validGuests.value.map(g => g.name)
      }
    )

    showToast(res.data.message || 'Saved')

    emit('saved')

    guests.value = [{ name: '' }]
    close()

  } catch (err) {
    console.error(err)
    showToast(err.response?.data?.message || 'Error')
  } finally {
    loading.value = false
  }
}
</script>