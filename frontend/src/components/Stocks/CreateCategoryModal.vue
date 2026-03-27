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
            <h3 class="text-2xl font-bold text-gray-900">Add New Category</h3>
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
                v-model="form.name"
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
                v-model="form.description"
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-150"
                placeholder="Enter category description"
              ></textarea>
            </div>
            <div class="flex items-center">
              <input
                id="is_expired_applicable"
                v-model="form.is_expired_applicable"
                type="checkbox"
                class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label
                for="is_expired_applicable"
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
                class="flex-1 px-4 py-3 text-white rounded-xl font-medium hover:opacity-90 transition-colors duration-150"
                :style="{
                  backgroundColor: buttonColor,
                  color: getButtonTextColor(),
                }"
              >
                Create Category
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
import { useTheme } from "@/composables/useTheme";

interface CreateCategoryForm {
  name: string;
  description: string;
  is_expired_applicable: boolean;
}

interface Props {
  show: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
  submit: [form: CreateCategoryForm];
}>();

const { buttonColor, getButtonTextColor } = useTheme();

const form = ref<CreateCategoryForm>({
  name: "",
  description: "",
  is_expired_applicable: false,
});

// const inventoryStore = useInventoryStore();

// const loading = computed(() => inventoryStore.loading);
// const error = computed(() => inventoryStore.error);

const handleSubmit = () => {
  emit("submit", { ...form.value });
};

// Reset form when modal is closed
watch(
  () => props.show,
  (newShow) => {
    if (!newShow) {
      form.value = {
        name: "",
        description: "",
        is_expired_applicable: false,
      };
    }
  },
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
