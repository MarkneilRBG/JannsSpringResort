<template>
  <div>
   

<!-- Button trigger modal -->
<button type="button" class="btn btn-primary mx-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

<h5>Click emojis to remove them.</h5>
  <ul v-auto-animate>
    <li
      v-for="item in items"
      :key="item"
      @click="removeItem(item)"
    >
      {{ item }}
    </li>
  </ul>

<p>Current Date: {{ currentTime }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const additionalEmojis = ["😎", "😉"]
const items = ref(["😏", "😐", "😑", "😒", "😕", ...additionalEmojis])

function removeItem(toRemove) {
  items.value = items.value.filter((item) => item !== toRemove)
}

const dayjs = useDayjs()
const currentTime = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))

const updateTime = () => {
  currentTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
}

onMounted(() => {
  const interval = setInterval(updateTime, 1000) // Update every second
  onUnmounted(() => clearInterval(interval)) // Cleanup on unmount
})

</script>