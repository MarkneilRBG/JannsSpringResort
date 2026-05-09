<template>
  <div
    class="modal fade"
    :id="id"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered" :class="size">
      <div class="modal-content border-0 shadow">

        <!-- HEADER -->
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="title" />
          </h5>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <!-- BODY -->
        <div class="modal-body">
          <slot />
        </div>

        <!-- FOOTER -->
        <div class="modal-footer">
          <slot name="footer" />
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  size: {
    type: String,
    default: ""
  }
});
</script>