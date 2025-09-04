<template>
  <transition name="modal-fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="$emit('close')"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto border border-gray-200"
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-gray-900">Edit Category</h3>
            <button
              @click="$emit('close')"
              class="text-gray-400 hover:text-gray-600 transition-colors duration-150"
            >
              <span class="material-icons">close</span>
            </button>
          </div>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Category Name *</label
              >
              <input
                v-model="localForm.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-150"
                placeholder="Enter category name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Description</label
              >
              <textarea
                v-model="localForm.description"
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-150"
                placeholder="Enter category description"
              ></textarea>
            </div>
            <div class="flex items-center">
              <input
                id="edit_is_expired_applicable"
                v-model="localForm.is_expired_applicable"
                type="checkbox"
                class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label
                for="edit_is_expired_applicable"
                class="ml-2 block text-sm text-gray-700"
              >
                Products in this category require expiry dates
              </label>
            </div>
            <div class="flex space-x-3 pt-6">
              <button
                type="button"
                @click="$emit('close')"
                class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors duration-150"
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
import { ref, watch } from "vue";

interface EditCategoryForm {
  id: number | null;
  name: string;
  description: string;
  is_expired_applicable: boolean;
}

interface Props {
  show: boolean;
  editCategoryForm: EditCategoryForm;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
  submit: [form: EditCategoryForm];
}>();

const localForm = ref<EditCategoryForm>({ ...props.editCategoryForm });

const handleSubmit = () => {
  emit("submit", { ...localForm.value });
};

// Update local form when props change
watch(
  () => props.editCategoryForm,
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
