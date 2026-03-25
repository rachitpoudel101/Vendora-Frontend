<template>
  <!-- Modal Overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
    @click.self="closeModal"
  >
    <!-- Modal Content -->
    <div
      class="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md transform transition-all mx-2"
      @click.stop
    >
      <!-- Modal Header -->
      <div
        class="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200"
      >
        <div>
          <h2 class="text-lg sm:text-xl font-semibold text-gray-900">
            Edit Supplier
          </h2>
          <p class="text-xs sm:text-sm text-gray-600 mt-1">
            Update supplier information
          </p>
        </div>
        <button
          @click="closeModal"
          class="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <span class="material-icons text-gray-500 text-20 sm:text-24"
            >close</span
          >
        </button>
      </div>

      <!-- Modal Body -->
      <div
        class="p-4 sm:p-6 space-y-3 sm:space-y-4 max-h-[60vh] sm:max-h-none overflow-y-auto"
      >
        <!-- Supplier Name -->
        <div>
          <label
            class="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
          >
            Supplier Name <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            :class="{ 'border-red-500': errors.name }"
            placeholder="Enter supplier name"
          />
          <p v-if="errors.name" class="text-red-500 text-xs sm:text-sm mt-1">
            {{ errors.name }}
          </p>
        </div>

        <!-- Phone Number -->
        <div>
          <label
            class="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
          >
            Phone Number
          </label>
          <input
            v-model="form.phone"
            type="text"
            class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            :class="{ 'border-red-500': errors.phone }"
            placeholder="Enter phone number"
          />
          <p v-if="errors.phone" class="text-red-500 text-xs sm:text-sm mt-1">
            {{ errors.phone }}
          </p>
        </div>

        <!-- Address -->
        <div>
          <label
            class="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
          >
            Address
          </label>
          <textarea
            v-model="form.address"
            rows="2"
            class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            :class="{ 'border-red-500': errors.address }"
            placeholder="Enter supplier address"
          ></textarea>
          <p v-if="errors.address" class="text-red-500 text-xs sm:text-sm mt-1">
            {{ errors.address }}
          </p>
        </div>
      </div>

      <!-- Modal Footer -->
      <div
        class="flex items-center justify-end gap-2 sm:gap-3 p-4 sm:p-6 border-t border-gray-200"
      >
        <button
          @click="closeModal"
          type="button"
          class="px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          :disabled="loading"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          type="button"
          class="px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          :disabled="loading"
        >
          <div
            v-if="loading"
            class="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
          ></div>
          <span>{{ loading ? "Updating..." : "Update" }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from "vue";
import { useToast } from "vue-toast-notification";
import { useSuppliersStore } from "@/stores/suppliersAPI";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  supplier: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["close", "updated"]);

const toast = useToast();
const suppliersStore = useSuppliersStore();

const form = reactive({
  name: "",
  phone: "",
  address: "",
});

const errors = reactive({
  name: "",
  phone: "",
  address: "",
});

// Computed properties for loading and error states
const loading = computed(() => suppliersStore.loading);
const error = computed(() => suppliersStore.error);

// Watch for supplier prop changes and populate form
watch(
  () => props.supplier,
  (newSupplier) => {
    if (newSupplier && newSupplier.id) {
      form.name = newSupplier.name || "";
      form.phone = newSupplier.phone || "";
      form.address = newSupplier.address || "";
    }
  },
  { immediate: true },
);

// Watch for modal open/close to reset form
watch(
  () => props.isOpen,
  (isOpen) => {
    if (!isOpen) {
      resetForm();
      clearErrors();
    }
  },
);

const validateForm = () => {
  clearErrors();
  let isValid = true;

  if (!form.name.trim()) {
    errors.name = "Supplier name is required";
    isValid = false;
  } else if (form.name.trim().length < 2) {
    errors.name = "Supplier name must be at least 2 characters";
    isValid = false;
  }

  if (form.phone && form.phone.trim()) {
    const phoneRegex = /^[+]?[\d\s\-()]+$/;
    if (!phoneRegex.test(form.phone.trim())) {
      errors.phone = "Please enter a valid phone number";
      isValid = false;
    }
  }

  return isValid;
};

const clearErrors = () => {
  errors.name = "";
  errors.phone = "";
  errors.address = "";
};

const resetForm = () => {
  form.name = "";
  form.phone = "";
  form.address = "";
};

const closeModal = () => {
  if (!loading.value) {
    emit("close");
  }
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  if (!props.supplier?.id) {
    toast.error("Supplier ID is missing");
    return;
  }

  try {
    const updateData = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
    };

    await suppliersStore.updateSupplier(props.supplier.id, form);

    toast.success("Supplier updated successfully!", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });

    emit("updated");
    emit("close");
  } catch (error) {
    console.error("❌ Failed to update supplier:", error);
    // Extract error message from response or fallback
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to update supplier. Please try again.";
    toast.error(errorMessage, {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>
