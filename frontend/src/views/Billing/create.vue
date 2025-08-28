<template>
  <div class="absolute top-0 left-[16rem] right-0 bottom-0 bg-white z-40 flex flex-col shadow-xl">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div class="flex items-center space-x-2 text-sm text-gray-600">
        <span>Purchase Bills</span>
        <span>&gt;</span>
        <span class="font-medium text-gray-900">Create</span>
      </div>
      <button class="text-gray-400 hover:text-gray-600" @click="$emit('close')">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <div class="flex-1 overflow-y-auto p-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Form Section -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Top Form Fields -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Vendor -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Vendor <span class="text-red-500">*</span>
              </label>
              <div class="flex">
                <select class="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select Vendor</option>
                </select>
                <button class="bg-blue-500 text-white px-3 py-2 rounded-r-md hover:bg-blue-600 text-sm">
                  +
                </button>
              </div>
            </div>

            <!-- Bill Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Bill date <span class="text-red-500">*</span>
              </label>
              <div class="flex">
                <input 
                  type="date" 
                  value="2025-08-28"
                  class="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <button class="bg-gray-100 border border-l-0 border-gray-300 px-3 py-2 rounded-r-md text-sm text-gray-600">
                  AD
                </button>
              </div>
            </div>

            <!-- Vendor Bill Number -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Vendor bill number
              </label>
              <input 
                type="text"
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>

            <!-- Payment Terms -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Payment Terms
              </label>
              <select class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Net 30</option>
                <option>Net 15</option>
                <option>Net 60</option>
              </select>
            </div>
          </div>

          <!-- Items Table -->
          <div class="overflow-x-auto">
            <table class="w-full border border-gray-300 text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700">SN</th>
                  <th class="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700">Item</th>
                  <th class="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700">Qty</th>
                  <th class="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700">CP</th>
                  <th class="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700">Dis %</th>
                  <th class="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700">Dis Amt.</th>
                  <th class="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700">Tax %</th>
                  <th class="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700">Tax Amount</th>
                  <th class="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700">Total CP</th>
                  <th class="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700">HS Code</th>
                  <th class="border border-gray-300 px-2 py-2 text-left font-medium text-gray-700">Description</th>
                  <th class="border border-gray-300 px-2 py-2 text-center font-medium text-gray-700">Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items" :key="index" class="hover:bg-gray-50">
                  <td class="border border-gray-300 px-2 py-2">{{ index + 1 }}.</td>
                  <td class="border border-gray-300 px-2 py-2">
                    <div class="flex">
                      <select class="flex-1 border-0 focus:outline-none text-sm">
                        <option>Select Item</option>
                      </select>
                      <button class="text-blue-500 hover:text-blue-700 ml-1" @click="addItem(index)">+</button>
                    </div>
                  </td>
                  <td class="border border-gray-300 px-2 py-2">
                    <input 
                      v-model="item.qty"
                      type="number" 
                      class="w-full border-0 focus:outline-none text-sm text-center"
                      @input="calculateRow(index)"
                    >
                  </td>
                  <td class="border border-gray-300 px-2 py-2">
                    <input 
                      v-model="item.cp"
                      type="number" 
                      step="0.01"
                      class="w-full border-0 focus:outline-none text-sm text-right"
                      @input="calculateRow(index)"
                    >
                  </td>
                  <td class="border border-gray-300 px-2 py-2">
                    <input 
                      v-model="item.discountPercent"
                      type="number" 
                      step="0.01"
                      class="w-full border-0 focus:outline-none text-sm text-center"
                      @input="calculateRow(index)"
                    >
                  </td>
                  <td class="border border-gray-300 px-2 py-2 text-right text-gray-600">
                    {{ item.discountAmount.toFixed(2) }}
                  </td>
                  <td class="border border-gray-300 px-2 py-2">
                    <div class="flex items-center">
                      <input type="checkbox" class="mr-1">
                      <input 
                        v-model="item.taxPercent"
                        type="number" 
                        step="0.01"
                        class="flex-1 border-0 focus:outline-none text-sm text-center"
                        @input="calculateRow(index)"
                      >
                    </div>
                  </td>
                  <td class="border border-gray-300 px-2 py-2 text-right text-gray-600">
                    {{ item.taxAmount.toFixed(2) }}
                  </td>
                  <td class="border border-gray-300 px-2 py-2 text-right font-medium">
                    {{ item.totalCP.toFixed(2) }}
                  </td>
                  <td class="border border-gray-300 px-2 py-2">
                    <input 
                      v-model="item.hsCode"
                      type="text"
                      class="w-full border-0 focus:outline-none text-sm"
                    >
                  </td>
                  <td class="border border-gray-300 px-2 py-2">
                    <input 
                      v-model="item.description"
                      type="text"
                      class="w-full border-0 focus:outline-none text-sm"
                    >
                  </td>
                  <td class="border border-gray-300 px-2 py-2 text-center">
                    <button
                      class="bg-red-600 text-white px-3 py-1 rounded-full font-bold text-lg shadow hover:bg-red-700 transition disabled:opacity-50"
                      @click="removeItem(index)"
                      :disabled="items.length === 1"
                      title="Remove item"
                    >-</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Remarks -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
            <textarea 
              v-model="remarks"
              rows="4"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter any additional remarks..."
            ></textarea>
          </div>
        </div>

        <!-- Bill Summary Section -->
        <div class="lg:col-span-1">
          <div class="bg-blue-600 text-white px-4 py-3 rounded-t-md">
            <h3 class="font-medium">Bill Summary</h3>
          </div>
          <div class="border border-t-0 border-gray-300 rounded-b-md p-4 space-y-4">
            <!-- Total Quantity -->
            <div class="flex justify-between items-center">
              <label class="text-sm text-gray-700">Total Quantity:</label>
              <div class="flex items-center">
                <span class="text-sm font-medium mr-2">{{ totalQuantity }}</span>
                <select class="border border-gray-300 rounded text-xs px-1 py-1">
                  <option>-</option>
                </select>
              </div>
            </div>

            <!-- Amount -->
            <div class="flex justify-between items-center">
              <label class="text-sm text-gray-700">Amount:</label>
              <div class="flex items-center">
                <span class="text-xs text-gray-500 mr-1">Rs.</span>
                <span class="text-sm font-medium">{{ totalAmount.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Book TDS -->
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <input type="checkbox" v-model="bookTDS" class="mr-2">
                <label class="text-sm text-gray-700">Book TDS</label>
              </div>
              <div class="flex items-center">
                <input 
                  v-model="tdsPercent"
                  type="number" 
                  step="0.01"
                  class="w-12 border border-gray-300 rounded text-xs px-1 py-1 text-center mr-1"
                  :disabled="!bookTDS"
                >
                <span class="text-xs">%</span>
              </div>
            </div>

            <!-- Dis Amt -->
            <div class="flex justify-between items-center">
              <label class="text-sm text-gray-700">Dis Amt.:</label>
              <div class="flex items-center">
                <span class="text-xs text-gray-500 mr-1">Rs.</span>
                <span class="text-sm font-medium">{{ totalDiscountAmount.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Tax Amount -->
            <div class="flex justify-between items-center">
              <label class="text-sm text-gray-700">Tax Amount:</label>
              <div class="flex items-center">
                <span class="text-xs text-gray-500 mr-1">Rs.</span>
                <span class="text-sm font-medium">{{ totalTaxAmount.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Total Amount -->
            <div class="flex justify-between items-center pt-2 border-t border-gray-200">
              <label class="text-sm font-medium text-gray-700">Total Amt:</label>
              <div class="flex items-center">
                <span class="text-xs text-gray-500 mr-1">Rs.</span>
                <span class="text-sm font-bold">{{ grandTotal.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
        <button class="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50" @click="$emit('close')">
          Close
        </button>
        <button class="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Form data
const remarks = ref('')
const bookTDS = ref(false)
const tdsPercent = ref(0)

// Items data
const items = ref([
  {
    qty: 1,
    cp: 0,
    discountPercent: 0,
    discountAmount: 0,
    taxPercent: 0,
    taxAmount: 0,
    totalCP: 0,
    hsCode: '',
    description: ''
  }
])

const addItem = (index) => {
  items.value.splice(index + 1, 0, {
    qty: 1,
    cp: 0,
    discountPercent: 0,
    discountAmount: 0,
    taxPercent: 0,
    taxAmount: 0,
    totalCP: 0,
    hsCode: '',
    description: ''
  })
}

const removeItem = (index) => {
  if (items.value.length > 1) {
    items.value.splice(index, 1)
  }
}

// Calculate row totals
const calculateRow = (index) => {
  const item = items.value[index]
  const subtotal = item.qty * item.cp
  item.discountAmount = (subtotal * item.discountPercent) / 100
  const afterDiscount = subtotal - item.discountAmount
  item.taxAmount = (afterDiscount * item.taxPercent) / 100
  item.totalCP = afterDiscount + item.taxAmount
}

// Computed totals
const totalQuantity = computed(() => {
  return items.value.reduce((sum, item) => sum + (item.qty || 0), 0)
})

const totalAmount = computed(() => {
  return items.value.reduce((sum, item) => sum + (item.qty * item.cp || 0), 0)
})

const totalDiscountAmount = computed(() => {
  return items.value.reduce((sum, item) => sum + (item.discountAmount || 0), 0)
})

const totalTaxAmount = computed(() => {
  return items.value.reduce((sum, item) => sum + (item.taxAmount || 0), 0)
})

const grandTotal = computed(() => {
  return items.value.reduce((sum, item) => sum + (item.totalCP || 0), 0)
})
</script>