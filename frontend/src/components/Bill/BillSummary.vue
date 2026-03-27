<template>
  <div
    class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
  >
    <!-- Header -->
    <div
      class="text-white px-4 sm:px-6 py-3 sm:py-4"
      :style="{ backgroundColor: buttonColor, color: getButtonTextColor() }"
    >
      <h3 class="font-semibold text-base sm:text-lg flex items-center">
        <svg
          class="w-4 h-4 sm:w-5 sm:h-5 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
          />
        </svg>
        Bill Summary
      </h3>
    </div>

    <!-- Summary Content -->
    <div class="p-4 sm:p-6">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
        <!-- Total Quantity -->
        <div
          class="flex flex-col items-center justify-center p-3 sm:p-4 bg-gray-50 rounded-lg border"
        >
          <label class="text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Total Quantity:
          </label>
          <div class="flex items-center space-x-2">
            <span class="text-xl sm:text-2xl font-bold text-gray-900">
              {{ totalQuantity }}
            </span>
            <span
              v-if="unitLabel"
              class="text-gray-500 font-normal text-sm sm:text-base"
            >
              ({{ unitLabel }})
            </span>
          </div>
        </div>

        <!-- Subtotal -->
        <div
          class="flex flex-col items-center justify-center p-3 sm:p-4 bg-gray-50 rounded-lg border"
        >
          <label class="text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Subtotal:
          </label>
          <div class="text-center">
            <span class="text-lg sm:text-xl font-bold text-gray-900">
              Rs. {{ subtotal.toFixed(2) }}
            </span>
          </div>
        </div>

        <!-- Discount -->
        <div
          class="flex flex-col items-center justify-center p-3 sm:p-4 bg-gray-50 rounded-lg border"
        >
          <label class="text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Discount:
          </label>
          <div class="text-center">
            <span class="text-lg sm:text-xl font-bold text-red-600">
              - Rs. {{ discount.toFixed(2) }}
            </span>
          </div>
        </div>

        <!-- VAT Amount -->
        <div
          class="flex flex-col items-center justify-center p-3 sm:p-4 bg-gray-50 rounded-lg border"
        >
          <label class="text-xs sm:text-sm font-medium text-gray-700 mb-2">
            VAT Amount:
          </label>
          <div class="text-center">
            <span class="text-lg sm:text-xl font-bold text-gray-900">
              Rs. {{ vatAmount.toFixed(2) }}
            </span>
          </div>
        </div>

        <!-- Grand Total -->
        <div
          class="col-span-2 md:col-span-1 flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg border-2"
          :style="{
            backgroundColor: buttonColor + '10',
            borderColor: buttonColor,
          }"
        >
          <label class="text-xs sm:text-sm font-bold text-gray-900 mb-2">
            Grand Total:
          </label>
          <div class="text-center">
            <span
              class="text-xl sm:text-2xl font-bold"
              :style="{ color: buttonColor }"
            >
              Rs. {{ grandTotal.toFixed(2) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useTheme } from "@/composables/useTheme";

const { buttonColor, getButtonTextColor } = useTheme();

const props = defineProps({
  totalQuantity: {
    type: Number,
    default: 0,
  },
  subtotal: {
    type: Number,
    default: 0.0,
  },
  discount: {
    type: Number,
    default: 0.0,
  },
  vatAmount: {
    type: Number,
    default: 0.0,
  },
  grandTotal: {
    type: Number,
    default: 0.0,
  },
  unitLabel: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
/* Responsive grid adjustments */
@media (max-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .md\:grid-cols-5 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .col-span-2.md\:col-span-1 {
    grid-column: span 2 / span 2;
  }
}
</style>
