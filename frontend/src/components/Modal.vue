<template>
  <div v-if="show" class="fixed inset-0 z-40 flex items-center justify-center">
    <!-- Modal Box -->
    <div 
      class="relative bg-white rounded-lg shadow-lg p-6"
      :class="customClass"
      :style="{ width, height }"
    >
      <!-- Close button -->
      <button 
        class="absolute top-2 right-2 text-gray-600 hover:text-black"
        @click="$emit('close')"
      >
        ✕
      </button>

      <!-- Slot content -->
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: { type: Boolean, required: true },
  width: { type: String, default: "500px" },   // configurable width
  height: { type: String, default: "auto" },    // configurable height
  customClass: { type: String, default: "" } // new prop
})
</script>
