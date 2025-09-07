<template>
  <div class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
      <div class="p-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-gray-900">Create Unit Configuration</h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-150"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Product Selection -->
          <div>
            <label for="product" class="block text-sm font-medium text-gray-700 mb-2">
              Product <span class="text-red-500">*</span>
            </label>
            <select
              id="product"
              v-model="form.product"
              required
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
            >
              <option value="">Select a product</option>
              <option v-for="product in products" :key="product.id" :value="product.id">
                {{ product.name }}
              </option>
            </select>
          </div>

          <!-- Unit Type Selection -->
          <div>
            <label for="unit_type" class="block text-sm font-medium text-gray-700 mb-2">
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
            <label for="conversion_per_unit" class="block text-sm font-medium text-gray-700 mb-2">
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
            <p class="text-xs text-gray-500 mt-1">Number of base units in one larger unit</p>
          </div>

          <!-- Conversion Unit Name -->
          <div>
            <label for="conversion_unit_name" class="block text-sm font-medium text-gray-700 mb-2">
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
            <p class="text-xs text-gray-500 mt-1">Base unit name for conversion</p>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg">
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
              <span v-if="loading">Creating...</span>
              <span v-else>Create Configuration</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { createUnitConfig } from "@/stores/unitConfigAPI";
import { fetchProduct } from "@/stores/InventoryAPI";
import { fetchUnit } from "@/stores/UnitAPI";

interface Product {
  id: number;
  name: string;
}

interface UnitType {
  id: number;
  unit: string;
}

const emit = defineEmits<{
  close: [];
  created: [];
}>();

const form = ref({
  product: "",
  unit_type: "",
  conversion_per_unit: "",
  conversion_unit_name: "",
});

const products = ref<Product[]>([]);
const unitTypes = ref<UnitType[]>([]);
const loading = ref(false);
const error = ref("");

const loadData = async () => {
  try {
    const [productsData, unitsData] = await Promise.all([
      fetchProduct(),
      fetchUnit(),
    ]);
    products.value = productsData;
    unitTypes.value = unitsData;
  } catch (err) {
    console.error("Error loading data:", err);
    error.value = "Failed to load products and unit types";
  }
};

const handleSubmit = async () => {
  error.value = "";
  loading.value = true;

  try {
    await createUnitConfig({
      product: parseInt(form.value.product),
      unit_type: parseInt(form.value.unit_type),
      conversion_per_unit: parseFloat(form.value.conversion_per_unit),
      conversion_unit_name: parseInt(form.value.conversion_unit_name),
    });

    emit("created");
  } catch (err) {
    console.error("Error creating unit configuration:", err);
    error.value = "Failed to create unit configuration. Please try again.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadData();
});
</script>
