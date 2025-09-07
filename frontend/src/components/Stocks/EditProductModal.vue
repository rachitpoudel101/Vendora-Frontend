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
            <h3 class="text-2xl font-bold text-gray-900">Edit Product</h3>
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
                  v-model="localForm.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Category *</label
                >
                <select
                  v-model="localForm.category"
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
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Supplier *</label
                >
                <select
                  v-model="localForm.supliers"
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
                  v-model="localForm.serial_number"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                  placeholder="Serial number (optional)"
                />
                <p class="text-xs text-gray-500 mt-1">
                  Leave empty if not applicable
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Stock Quantity *</label
                >
                <input
                  v-model="localForm.stock"
                  type="number"
                  min="0"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                  placeholder="0"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Cost Price *</label
                >
                <input
                  v-model="localForm.cost_price"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Margin *</label
                >
                <input
                  v-model="localForm.margin"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Unit *</label
                >
                <select
                  v-model="localForm.unit"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                >
                  <option value="" disabled>Select Unit</option>
                  <option
                    v-for="unit in units"
                    :key="unit.id"
                    :value="unit.unit"
                  >
                    {{ unit.unit }}
                  </option>
                </select>
              </div>
              <div v-if="isEditExpiryRequired">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date *
                  <span
                    v-if="!canEditExpiry"
                    class="text-xs text-amber-600 font-normal ml-1"
                    >(Admin/Superuser only)</span
                  >
                </label>
                <input
                  v-model="localForm.expires_at"
                  type="datetime-local"
                  :required="isEditExpiryRequired"
                  :disabled="!canEditExpiry"
                  :class="[
                    'w-full px-4 py-3 border border-gray-300 rounded-xl transition-all duration-150',
                    canEditExpiry
                      ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      : 'bg-gray-100 cursor-not-allowed text-gray-500',
                  ]"
                />
                <p v-if="!canEditExpiry" class="text-xs text-amber-600 mt-1">
                  Only administrators can modify expiry dates
                </p>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Description</label
                >
                <textarea
                  v-model="localForm.description"
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
                  >Rs. {{ editSellingPrice }}</span
                >
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
                Save Changes
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

interface EditProductForm {
  name: string;
  category: string | number;
  supliers: string | number;
  batch_number: string;
  serial_number: string;
  cost_price: number | null;
  margin: number | null;
  stock: number | null;
  unit: string | number;
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
  editForm: EditProductForm;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
  submit: [form: EditProductForm];
}>();

const localForm = ref<EditProductForm>({ ...props.editForm });

const editSellingPrice = computed(() => {
  const cp = Number(localForm.value.cost_price) || 0;
  const margin = Number(localForm.value.margin) || 0;
  return cp + margin;
});

const selectedEditCategory = computed((): Category | null => {
  const categoryId = Number(localForm.value.category);
  return props.categories.find((cat) => cat.id === categoryId) || null;
});

const isEditExpiryRequired = computed(() => {
  return selectedEditCategory.value?.is_expired_applicable || false;
});

const handleSubmit = () => {
  // Find the selected unit object
  const selectedUnitObj = props.units.find(
    (u) => u.unit === localForm.value.unit,
  );
  // Ensure correct types before emitting
  const payload: EditProductForm = {
    ...localForm.value,
    category: String(localForm.value.category),
    supliers: Number(localForm.value.supliers),
    unit: selectedUnitObj ? selectedUnitObj.id : localForm.value.unit, // pk value if found, else fallback
  };
  emit("submit", payload);
};

// Update local form when props change
watch(
  () => props.editForm,
  (newForm) => {
    localForm.value = { ...newForm };
  },
  { deep: true },
);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
