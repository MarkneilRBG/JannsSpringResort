<script setup>
import { ref } from 'vue'
import { useAutoAnimate } from '@formkit/auto-animate/vue'

const items = ref(["React", "Vue", "Svelte", "Angular"])

function sortAsc() {
  items.value.sort()
}
function sortDesc() {
  items.value.sort().reverse()
}

const [parent] = useAutoAnimate()
</script>

<template>
  <div>
    <button @click="sortAsc">Sort A-Z ↑</button>
    <button @click="sortDesc">Sort Z-A ↓</button>
  </div>
  <ul ref="parent">
    <li
      v-for="item in items"
      :key="item"
    >
      {{ item }}
    </li>
  </ul>

  <inputPassword />
</template>