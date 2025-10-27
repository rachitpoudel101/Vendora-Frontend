<template>
  <transition name="modal-fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="$emit('close')"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200"
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-gray-900">Add New Product</h3>
            <button
              @click="$emit('close')"
              class="text-gray-400 hover:text-gray-600 transition-colors duration-150"
            >
              <span class="material-icons">close</span>
            </button>
          </div>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Product Name *</label
                >
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                  placeholder="Enter product name"
                />
              </div>
              <div id="category-dropdown">
                <label
                  class="block text-sm font-medium text-gray-700 mb-2"
                  name="category"
                  >Category *</label
                >
                <div v-if="hasNoCategories" class="space-y-2">
                  <div
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500 flex items-center justify-between"
                  >
                    <span>No categories available</span>
                  </div>
                  <button
                    type="button"
                    @click="$emit('add-category')"
                    class="w-full px-4 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors duration-150 flex items-center justify-center"
                  >
                    <span class="material-icons text-20 mr-2">add</span>
                    Add Category
                  </button>
                </div>
                <select
                  v-else
                  v-model="form.category"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                >
                  <option value="" disabled>Select Category</option>
                  <option
                    v-for="cat in categories"
                    :key="cat.id"
                    :value="cat.id"
                  >
                    {{ cat.name }}
                  </option>
                </select>
              </div>
              <div id="category-dropdown">
                <label
                  class="block text-sm font-medium text-gray-700 mb-2"
                  name="supplier"
                  >Supplier *</label
                >
                <select
                  v-model="form.supliers"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                >
                  <option value="" disabled>Select Supplier</option>
                  <option
                    v-for="supplier in suppliers"
                    :key="supplier.id"
                    :value="supplier.id"
                  >
                    {{ supplier.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Serial Number</label
                >
                <input
                  v-model="form.serial_number"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                  placeholder="Serial number (optional)"
                />
                <p class="text-xs text-gray-500 mt-1">
                  Leave empty if not applicable
                </p>
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 mb-2"
                  id="stock_quantity"
                  >Stock Quantity *</label
                >
                <input
                  v-model.number="form.stock"
                  type="number"
                  min="0"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                  placeholder="0"
                />
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 mb-2"
                  id="cost_price"
                  >Cost Price *</label
                >
                <input
                  v-model.number="form.cost_price"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 mb-2"
                  id="margin"
                  >Margin *</label
                >
                <input
                  v-model.number="form.margin"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 mb-2"
                  name="base_unit"
                  >Base Unit*</label
                >
                <select
                  v-model="form.unit"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                >
                  <option value="" disabled>Select Unit</option>
                  <option
                    v-for="unitObj in units"
                    :key="unitObj.id"
                    :value="unitObj.id"
                  >
                    {{ unitObj.unit }}
                  </option>
                </select>
              </div>
              <div v-if="isExpiryRequired">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date *
                </label>
                <input
                  v-model="form.expires_at"
                  type="datetime-local"
                  :required="isExpiryRequired"
                  :disabled="!canEditExpiry"
                  :class="[
                    'w-full px-4 py-3 border border-gray-300 rounded-xl transition-all duration-150',
                    canEditExpiry
                      ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      : 'bg-gray-100 cursor-not-allowed text-gray-500',
                  ]"
                />
                <p v-if="!canEditExpiry" class="text-xs text-amber-600 mt-1">
                  Only administrators can set expiry dates for products
                </p>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Description</label
                >
                <textarea
                  v-model="form.description"
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                  placeholder="Enter product description"
                ></textarea>
              </div>
            </div>

            <div class="bg-blue-50 p-4 rounded-xl mt-4">
              <div class="flex justify-between items-center">
                <span class="font-medium text-gray-700">Selling Price:</span>
                <span class="text-xl font-bold text-blue-600"
                  >Rs. {{ sellingPrice }}</span
                >
              </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-xl">
              <div class="flex items-center text-sm text-gray-600">
                <span class="material-icons text-16 mr-2">info</span>
                <span>Batch number will be auto-generated after creation</span>
              </div>
            </div>

            <div class="flex space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                @click="$emit('close')"
                class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-150"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

interface CreateProductForm {
  name: string;
  category: string | number | null;
  supliers: number | null;
  serial_number: string;
  cost_price: number | null;
  margin: number | null;
  stock: number | null;
  unit: number | null;
  base_unit: number | null;
  expires_at: string;
  description: string;
}

interface Category {
  id: number;
  name: string;
  is_expired_applicable: boolean;
}

interface Supplier {
  id: number;
  name: string;
}

interface Unit {
  id: number;
  unit: string;
}

interface Props {
  show: boolean;
  categories: Category[];
  suppliers: Supplier[];
  units: Unit[];
  canEditExpiry: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
  submit: [form: CreateProductForm];
  "add-category": [];
}>();

const form = ref<CreateProductForm>({
  name: "",
  category: null,
  supliers: null,
  serial_number: "",
  cost_price: null,
  margin: null,
  stock: null,
  unit: null,
  base_unit: null,
  expires_at: "",
  description: "",
});

const sellingPrice = computed(() => {
  const cp = Number(form.value.cost_price) || 0;
  const margin = Number(form.value.margin) || 0;
  return cp + margin;
});

const selectedCategory = computed((): Category | null => {
  const categoryId = Number(form.value.category);
  return props.categories.find((cat) => cat.id === categoryId) || null;
});

const isExpiryRequired = computed(() => {
  return selectedCategory.value?.is_expired_applicable || false;
});

const hasNoCategories = computed(() => {
  return props.categories.length === 0;
});

// Keep base_unit in sync with selected unit id
watch(
  () => form.value.unit,
  (newUnit) => {
    if (newUnit != null) {
      form.value.base_unit = Number(newUnit);
    }
  },
  { immediate: true },
);

const handleSubmit = () => {
  // Validate required fields
  if (!form.value.category || !form.value.supliers || !form.value.unit) {
    console.error("Missing required fields");
    return;
  }

  // Ensure base_unit is set
  const unitValue = Number(form.value.unit);
  if (!form.value.base_unit) {
    form.value.base_unit = unitValue;
  }

  // If expiry is required but not provided, prevent submission
  if (isExpiryRequired.value && !form.value.expires_at && props.canEditExpiry) {
    console.error("Expiry date is required for this category");
    return;
  }

  const baseUnitValue = Number(form.value.base_unit || unitValue);

  const payload = {
    name: form.value.name,
    category: Number(form.value.category),
    supliers: Number(form.value.supliers),
    serial_number: form.value.serial_number || "",
    cost_price: Number(form.value.cost_price) || 0,
    margin: Number(form.value.margin) || 0,
    stock: Number(form.value.stock) || 0,
    unit: unitValue,
    base_unit: baseUnitValue,
    expires_at: isExpiryRequired.value ? form.value.expires_at : "",
    description: form.value.description || "",
  };

  console.log("Submitting payload:", payload); // Debug log
  emit("submit", payload);
};

// Reset form when modal is closed
watch(
  () => props.show,
  (newShow) => {
    if (!newShow) {
      form.value = {
        name: "",
        category: null,
        supliers: null,
        serial_number: "",
        cost_price: null,
        margin: null,
        stock: null,
        unit: null,
        base_unit: null,
        expires_at: "",
        description: "",
      };
    }
  },
);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

.text-16 {
  font-size: 16px;
}

.text-20 {
  font-size: 20px;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
