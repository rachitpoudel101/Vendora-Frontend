<template>
  <div class="fixed inset-0 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900">Add New Unit</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="unit" class="block text-sm font-medium text-gray-700 mb-2">
            Unit Name *
          </label>
          <input
            id="unit"
            v-model="form.unit"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter unit name (e.g., kg, liter, piece)"
          />
          <p v-if="errors.unit" class="mt-1 text-sm text-red-600">{{ errors.unit }}</p>
        </div>

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {{ loading ? 'Creating...' : 'Create Unit' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { createUnit, fetchUnit, updateunit } from '@/stores/UnitAPI'

const emit = defineEmits(['close', 'created'])

const loading = ref(false)
const form = reactive({
  unit: ''
})

const errors = reactive({
  unit: ''
})

const validateForm = () => {
  errors.unit = ''
  
  if (!form.unit.trim()) {
    errors.unit = 'Unit name is required'
    return false
  }
  
  if (form.unit.trim().length < 2) {
    errors.unit = 'Unit name must be at least 2 characters'
    return false
  }
  
  return true
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    loading.value = true
    // Fetch all units to check for deleted ones
    const allUnits = await fetchUnit()
    // Find a deleted unit with the same name (case-insensitive)
    const existingDeleted = allUnits.find(
      u => u.unit.trim().toLowerCase() === form.unit.trim().toLowerCase() && u.is_deleted
    )
    if (existingDeleted) {
      // If found, update is_deleted to false (reactivate)
      await updateunit(existingDeleted.id, { unit: form.unit.trim(), is_deleted: false })
      emit('created')
      loading.value = false
      return
    }
    // Otherwise, create new unit
    await createUnit({ unit: form.unit.trim() })
    emit('created')
  } catch (error) {
    console.error('Error creating unit:', error)
    errors.unit = 'Failed to create unit. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
