<template>
  <div
    class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200"
    >
      <div class="p-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-gray-900">
            Edit Unit Configuration
          </h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-150"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Product Selection -->
          <div>
            <label
              for="product"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Product <span class="text-red-500">*</span>
            </label>
            <select
              id="product"
              v-model="form.product"
              required
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
            >
              <option value="">Select a product</option>
              <option
                v-for="product in products"
                :key="product.id"
                :value="product.id"
              >
                {{ product.name }}
              </option>
            </select>
          </div>

          <!-- Unit Type Selection -->
          <div>
            <label
              for="unit_type"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Unit Type <span class="text-red-500">*</span>
            </label>
            <select
              id="unit_type"
              v-model="form.unit_type"
              required
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
            >
              <option value="">Select a unit type</option>
              <option v-for="unit in unitTypes" :key="unit.id" :value="unit.id">
                {{ unit.unit }}
              </option>
            </select>
          </div>

          <!-- Conversion Per Unit -->
          <div>
            <label
              for="conversion_per_unit"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Conversion Per Unit <span class="text-red-500">*</span>
            </label>
            <input
              id="conversion_per_unit"
              v-model="form.conversion_per_unit"
              type="number"
              step="0.01"
              min="0.01"
              required
              placeholder="e.g., 24"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
            />
            <p class="text-xs text-gray-500 mt-1">
              Number of base units in one larger unit
            </p>
          </div>

          <!-- Conversion Unit Name -->
          <div>
            <label
              for="conversion_unit_name"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Conversion Unit Name <span class="text-red-500">*</span>
            </label>
            <select
              id="conversion_unit_name"
              v-model="form.conversion_unit_name"
              required
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
            >
              <option value="">Select conversion unit</option>
              <option v-for="unit in unitTypes" :key="unit.id" :value="unit.id">
                {{ unit.unit }}
              </option>
            </select>
            <p class="text-xs text-gray-500 mt-1">
              Base unit name for conversion
            </p>
          </div>

          <!-- Error Message -->
          <div
            v-if="error"
            class="p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <p class="text-red-700 text-sm">{{ error }}</p>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-3 pt-4">
            <button
              type="button"
              @click="$emit('close')"
              class="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              <span v-if="loading">Updating...</span>
              <span v-else>Update Configuration</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useUnitConfigStore } from "@/stores/unitConfigAPI";
import { useInventoryStore } from "@/stores/InventoryAPI";
import { useUnitStore } from "@/stores/UnitAPI";

// Changed: allow string|number for fields that sometimes arrive as strings
interface UnitConfig {
  id: number;
  product: number | string;
  product_name?: string;
  unit_type: number | string;
  unit_type_name?: string;
  conversion_per_unit: number | string;
  conversion_unit_name: number | string;
}

const props = defineProps<{
  unitConfig: UnitConfig;
}>();

const emit = defineEmits<{
  close: [];
  updated: [];
}>();

const form = ref({
  product: "",
  unit_type: "",
  conversion_per_unit: "",
  conversion_unit_name: "",
});

const unitConfigStore = useUnitConfigStore();
const inventoryStore = useInventoryStore();
const unitStore = useUnitStore();

// Added local submitting flag instead of mutating store.loading directly
const submitting = ref(false);

const loading = computed(
  () =>
    submitting.value ||
    unitConfigStore.loading ||
    inventoryStore.loading ||
    unitStore.loading,
);
const error = ref("");
const products = computed(() => inventoryStore.products);
const unitTypes = computed(() => unitStore.units);

const loadData = async () => {
  try {
    await Promise.all([inventoryStore.fetchProducts(), unitStore.fetchUnits()]);
  } catch (err) {
    console.error("Error loading data:", err);
    error.value = "Failed to load products and unit types";
  }
};

const initializeForm = () => {
  if (props.unitConfig) {
    form.value = {
      product: props.unitConfig.product.toString(),
      unit_type: props.unitConfig.unit_type.toString(),
      conversion_per_unit: props.unitConfig.conversion_per_unit.toString(),
      conversion_unit_name: props.unitConfig.conversion_unit_name.toString(),
    };
  }
};

const handleSubmit = async () => {
  error.value = "";
  submitting.value = true; // changed from assigning to store.loading

  try {
    const updatedData = {
      product: parseInt(String(form.value.product)),
      unit_type: parseInt(String(form.value.unit_type)),
      conversion_per_unit: parseFloat(String(form.value.conversion_per_unit)),
      conversion_unit_name: parseInt(String(form.value.conversion_unit_name)),
    };

    await unitConfigStore.updateUnitConfig(props.unitConfig.id, updatedData);

    emit("updated");
  } catch (err) {
    console.error("Error updating unit configuration:", err);
    error.value = "Failed to update unit configuration. Please try again.";
  } finally {
    submitting.value = false; // changed from assigning to store.loading
  }
};

watch(
  () => props.unitConfig,
  () => {
    initializeForm();
  },
  { immediate: true },
);

onMounted(() => {
  loadData();
  initializeForm();
});
</script>
