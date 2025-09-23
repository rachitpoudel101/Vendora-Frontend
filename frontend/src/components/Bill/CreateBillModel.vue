<template>
  <div
    class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 flex items-center justify-center p-2 sm:p-4"
  >
    <div
      class="bg-white rounded-lg sm:rounded-xl shadow-2xl w-full max-w-[90vw] max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden"
    >
      <!-- Header -->
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 gap-3 sm:gap-0"
      >
        <div class="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
          <div
            class="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-3 h-3 sm:w-5 sm:h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-lg sm:text-xl font-semibold text-gray-900">
              Create Purchase Bill
            </h1>
            <div
              class="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500"
            >
              <span>Purchase Bills</span>
              <svg
                class="w-3 h-3 sm:w-4 sm:h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="font-medium text-gray-900">Create</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons moved to header -->
        <div class="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
          <button
            class="flex-1 sm:flex-none px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button
            class="flex-1 sm:flex-none px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-lg"
            @click="onSubmit"
          >
            <svg
              class="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Save Bill
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-3 sm:p-6 bg-gray-50">
        <div class="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6">
          <!-- Main Form Section -->
          <div class="lg:col-span-1 space-y-4 sm:space-y-6">
            <!-- Top Form Fields -->
            <div
              class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6"
            >
              <h3
                class="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 flex items-center"
              >
                <svg
                  class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Bill Information
              </h3>
              <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
              >
                <!-- Customer Name -->
                <div>
                  <label
                    class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                  >
                    Customer Name <span class="text-red-500">*</span>
                  </label>
                  <input
                    ref="customerNameInput"
                    v-model="customerName"
                    type="text"
                    class="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter customer name"
                    @keydown.enter="focusNext"
                  />
                </div>
                <!-- Bill Date -->
                <div>
                  <label
                    class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                  >
                    Bill Date <span class="text-red-500">*</span>
                  </label>
                  <div
                    class="flex rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500"
                  >
                    <input
                      ref="billDateInput"
                      v-model="billDate"
                      type="date"
                      class="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none"
                      @keydown.enter="focusNext"
                    />
                    <button
                      class="bg-gray-100 border-l border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      AD
                    </button>
                  </div>
                </div>
                <!-- Payment Method -->
                <div>
                  <label
                    class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                  >
                    Payment Method <span class="text-red-500">*</span>
                  </label>
                  <select
                    ref="paymentMethodInput"
                    v-model="paymentMethod"
                    class="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    @keydown.enter="focusNext"
                  >
                    <option value="cash">Cash</option>
                    <option value="online">Online</option>
                  </select>
                </div>
              </div>

              <!-- Second Row for Billed By -->
              <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4"
              >
                <!-- Billed By -->
                <div>
                  <label
                    class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                  >
                    Billed By <span class="text-red-500">*</span>
                  </label>
                  <input
                    ref="billedByInput"
                    v-model="billedBy"
                    type="text"
                    :disabled="isDisabled"
                    class="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-100 text-gray-500 cursor-not-allowed"
                    placeholder="Enter billed by name"
                    @keydown.enter="focusNext"
                  />
                </div>
                <!-- Empty divs for spacing on larger screens -->
                <div class="hidden lg:block"></div>
                <div class="hidden lg:block"></div>
              </div>
            </div>

            <!-- Items Table -->
            <div
              class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div class="p-4 sm:p-6 border-b border-gray-200">
                <h3
                  class="text-base sm:text-lg font-medium text-gray-900 flex items-center"
                >
                  <svg
                    class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Items
                </h3>
              </div>

              <!-- Mobile Cards View for Items -->
              <div class="block md:hidden">
                <div class="p-4 space-y-4">
                  <div
                    v-for="(item, index) in items"
                    :key="index"
                    class="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <div class="flex justify-between items-start mb-3">
                      <span class="text-sm font-semibold text-gray-700"
                        >Item #{{ index + 1 }}</span
                      >
                      <button
                        class="w-6 h-6 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        @click="removeItem(index)"
                        :disabled="items.length === 1"
                        title="Remove item"
                      >
                        ×
                      </button>
                    </div>

                    <!-- Item Selection -->
                    <div class="space-y-3">
                      <div>
                        <label
                          class="block text-xs font-medium text-gray-700 mb-1"
                          >Product</label
                        >
                        <div class="flex space-x-2">
                          <select
                            v-model="item.product_id"
                            class="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            @change="updateItemPrice(index)"
                          >
                            <option value="">Select Item</option>
                            <option
                              v-for="product in products"
                              :key="product.id"
                              :value="product.id"
                            >
                              {{ product.name }}
                            </option>
                          </select>
                          <button
                            class="w-8 h-8 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
                            @click="addItem(index)"
                            title="Add new item"
                          >
                            <svg
                              class="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </button>
                        </div>
                        <span
                          v-if="item.product_id"
                          class="text-xs text-gray-500 mt-1 block"
                        >
                          Unit: {{ getProductUnit(item.product_id) }}
                        </span>
                      </div>

                      <!-- Quantity and Stock -->
                      <div class="grid grid-cols-2 gap-3">
                        <div>
                          <label
                            class="block text-xs font-medium text-gray-700 mb-1"
                            >Quantity</label
                          >
                          <input
                            v-model="item.qty"
                            type="number"
                            :max="getStock(item.product_id)"
                            min="0"
                            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            @input="calculateRow(index)"
                          />
                          <span
                            v-if="item.product_id"
                            class="text-xs text-gray-500 mt-1"
                          >
                            Stock: {{ getStock(item.product_id) }}
                          </span>
                        </div>
                        <div>
                          <label
                            class="block text-xs font-medium text-gray-700 mb-1"
                            >Price</label
                          >
                          <input
                            v-model="item.price"
                            type="number"
                            step="0.01"
                            min="0"
                            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50"
                            readonly
                          />
                        </div>
                      </div>

                      <!-- Discount and VAT -->
                      <div class="grid grid-cols-2 gap-3">
                        <div>
                          <div class="flex items-center space-x-2 mb-2">
                            <input
                              type="checkbox"
                              v-model="item.discountCheckbox"
                              @change="calculateRow(index)"
                              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label class="text-xs font-medium text-gray-700"
                              >Discount</label
                            >
                          </div>
                          <div
                            v-if="item.discountCheckbox"
                            class="flex items-center space-x-1"
                          >
                            <input
                              v-model.number="item.discountPercent"
                              type="number"
                              min="0"
                              max="100"
                              class="flex-1 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                              @input="calculateRow(index)"
                              placeholder="%"
                            />
                            <span class="text-xs text-gray-500">%</span>
                          </div>
                          <div class="text-sm font-medium text-gray-900 mt-1">
                            Rs. {{ item.discountAmount.toFixed(2) }}
                          </div>
                        </div>
                        <div>
                          <div class="flex items-center space-x-2 mb-2">
                            <input
                              type="checkbox"
                              v-model="item.vatCheckbox"
                              @change="calculateRow(index)"
                              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label class="text-xs font-medium text-gray-700"
                              >VAT</label
                            >
                          </div>
                          <div
                            v-if="item.vatCheckbox"
                            class="flex items-center space-x-1"
                          >
                            <input
                              v-model.number="item.vatPercent"
                              type="number"
                              min="0"
                              max="100"
                              class="flex-1 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                              @input="calculateRow(index)"
                              placeholder="%"
                            />
                            <span class="text-xs text-gray-500">%</span>
                          </div>
                          <div class="text-sm font-medium text-gray-900 mt-1">
                            Rs. {{ item.vatAmount.toFixed(2) }}
                          </div>
                        </div>
                      </div>

                      <!-- Total -->
                      <div class="pt-2 border-t border-gray-200">
                        <div class="flex justify-between items-center">
                          <span class="text-sm font-medium text-gray-700"
                            >Total:</span
                          >
                          <span class="text-lg font-bold text-blue-600">
                            Rs. {{ item.totalPrice.toFixed(2) }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Desktop Table View -->
              <div class="hidden md:block overflow-x-auto">
                <table class="w-full min-w-[1200px] text-sm">
                  <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th
                        class="px-4 py-3 text-left font-medium text-gray-700 w-16"
                      >
                        SN
                      </th>
                      <th class="px-4 py-3 text-left font-medium text-gray-700">
                        Item
                      </th>
                      <th
                        class="px-4 py-3 text-left font-medium text-gray-700 w-28"
                      >
                        Batch No
                      </th>
                      <th
                        class="px-4 py-3 text-left font-medium text-gray-700 w-28"
                      >
                        Serial No
                      </th>
                      <th
                        v-if="products.some((p) => p.code)"
                        class="px-4 py-3 text-left font-medium text-gray-700 w-28"
                      >
                        Code
                      </th>
                      <th
                        class="px-4 py-3 text-left font-medium text-gray-700 w-20"
                      >
                        Unit
                      </th>
                      <th
                        class="px-4 py-3 text-left font-medium text-gray-700 w-24"
                      >
                        Qty
                      </th>
                      <th
                        class="px-4 py-3 text-left font-medium text-gray-700 w-24"
                      >
                        Price
                      </th>
                      <th
                        class="px-4 py-3 text-left font-medium text-gray-700 w-32"
                      >
                        Dis Amt.
                      </th>
                      <th
                        class="px-4 py-3 text-left font-medium text-gray-700 w-24"
                      >
                        VAT
                      </th>
                      <th
                        class="px-4 py-3 text-left font-medium text-gray-700 w-28"
                      >
                        Total
                      </th>
                      <th
                        class="px-4 py-3 text-center font-medium text-gray-700 w-20"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr
                      v-for="(item, index) in items"
                      :key="index"
                      class="hover:bg-gray-50 transition-colors"
                    >
                      <td class="px-4 py-3 text-gray-600 font-medium">
                        {{ index + 1 }}.
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex items-center space-x-2">
                          <select
                            :ref="`itemSelect${index}`"
                            v-model="item.product_id"
                            class="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            @change="updateItemPrice(index)"
                            @keydown.enter="focusNext"
                          >
                            <option value="">Select Item</option>
                            <option
                              v-for="product in products"
                              :key="product.id"
                              :value="product.id"
                            >
                              {{ product.name }}
                            </option>
                          </select>
                          <button
                            class="w-8 h-8 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                            @click="addItem(index)"
                            title="Add new item"
                          >
                            <svg
                              class="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td class="px-4 py-3 text-gray-600 text-sm">
                        {{ getProductBatch(item.product_id) }}
                      </td>
                      <td class="px-4 py-3 text-gray-600 text-sm">
                        {{ getProductSerial(item.product_id) }}
                      </td>
                      <td
                        v-if="
                          products.find(
                            (p) => p.id === item.product_id && p.code,
                          )
                        "
                        class="px-4 py-3 text-gray-600 text-sm"
                      >
                        {{ getProductCode(item.product_id) }}
                      </td>
                      <td class="px-4 py-3 text-gray-600 text-sm">
                        {{
                          item.product_id
                            ? getProductUnit(item.product_id)
                            : "-"
                        }}
                      </td>
                      <td class="px-4 py-3">
                        <div>
                          <input
                            :ref="`qtyInput${index}`"
                            v-model="item.qty"
                            type="number"
                            :max="getStock(item.product_id)"
                            min="0"
                            class="w-20 border border-gray-300 rounded-md px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            @input="calculateRow(index)"
                            @keydown.enter="focusNext"
                          />
                          <span
                            v-if="item.product_id"
                            class="text-xs text-gray-500 mt-1 block"
                          >
                            Stock: {{ getStock(item.product_id) }}
                          </span>
                        </div>
                      </td>
                      <td class="px-4 py-3">
                        <input
                          :ref="`priceInput${index}`"
                          v-model="item.price"
                          type="number"
                          step="0.01"
                          min="0"
                          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 no-spinner"
                          @input="calculateRow(index)"
                          @keydown.enter="focusNext"
                          readonly
                        />
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            v-model="item.discountCheckbox"
                            @change="calculateRow(index)"
                            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div
                            v-if="item.discountCheckbox"
                            class="flex items-center space-x-1"
                          >
                            <input
                              :ref="`discountInput${index}`"
                              v-model.number="item.discountPercent"
                              type="number"
                              min="0"
                              max="100"
                              class="w-20 border border-gray-300 rounded px-2 py-1 text-xs text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                              @input="calculateRow(index)"
                              @change="calculateRow(index)"
                              @keydown.enter="focusNext"
                              placeholder="%"
                            />
                            <span class="text-xs text-gray-500">%</span>
                          </div>
                        </div>
                        <div
                          class="text-right text-sm font-medium text-gray-900 mt-1"
                        >
                          <!-- Only show if discountAmount > 0 -->
                          <template v-if="item.discountAmount > 0">
                            Rs. {{ item.discountAmount.toFixed(2) }}
                          </template>
                        </div>
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            v-model="item.vatCheckbox"
                            @change="calculateRow(index)"
                            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div
                            v-if="item.vatCheckbox"
                            class="flex items-center space-x-1"
                          >
                            <input
                              :ref="`vatInput${index}`"
                              v-model.number="item.vatPercent"
                              type="number"
                              min="0"
                              max="100"
                              class="w-20 border border-gray-300 rounded px-2 py-1 text-xs text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                              @input="calculateRow(index)"
                              @change="calculateRow(index)"
                              @keydown.enter="focusNext"
                              placeholder="%"
                            />
                            <span class="text-xs text-gray-500">%</span>
                          </div>
                        </div>
                        <div
                          class="text-right text-sm font-medium text-gray-900 mt-1"
                        >
                          <!-- Only show if vatAmount > 0 -->
                          <template v-if="item.vatAmount > 0">
                            Rs. {{ item.vatAmount.toFixed(2) }}
                          </template>
                        </div>
                      </td>
                      <td
                        class="px-4 py-3 text-right text-sm font-bold text-gray-900"
                      >
                        Rs. {{ item.totalPrice.toFixed(2) }}
                      </td>
                      <td class="px-4 py-3 text-center">
                        <button
                          class="w-8 h-8 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                          @click="removeItem(index)"
                          :disabled="items.length === 1"
                          title="Remove item"
                        >
                          <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Bill Summary Section -->
        <div class="mt-4 sm:mt-6">
          <BillSummary
            :totalQuantity="totalQuantity"
            :subtotal="totalAmount"
            :discount="totalDiscountAmount"
            :vatAmount="totalTaxAmount"
            :grandTotal="grandTotal"
            :unitLabel="unitLabel"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useBillsStore } from "@/stores/billsAPI";
import { useInventoryStore } from "@/stores/InventoryAPI";
import { useAuthStore } from "@/stores/auth";
import { useToast } from "vue-toast-notification";
import BillSummary from "@/components/Bill/BillSummary.vue";

// Form data
const customerName = ref("");
const billDate = ref(new Date().toISOString().substr(0, 10));
const paymentMethod = ref("cash");
const billedBy = ref("");
const billedById = ref(""); // Store user ID separately
const remarks = ref("");
const isDisabled = ref(true); // Add this missing property

// Products for dropdown
const billsStore = useBillsStore();
const inventoryStore = useInventoryStore();

const loading = computed(() => billsStore.loading || inventoryStore.loading);
const error = computed(() => billsStore.error || inventoryStore.error);
const products = computed(() => inventoryStore.products);

// Get current user from localStorage or auth store
const getCurrentUser = () => {
  // Try to get user from localStorage
  const userData = localStorage.getItem("user");
  if (userData) {
    try {
      const user = JSON.parse(userData);
      return {
        username: user.username || user.name || user.email || "",
        id: user.id || "",
      };
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }

  // Try to get from auth store if available
  try {
    const authStore = useAuthStore();
    if (authStore?.user) {
      return {
        username:
          authStore.user.username ||
          authStore.user.name ||
          authStore.user.email ||
          "",
        id: authStore.user.id || "",
      };
    }
  } catch (error) {
    console.error("Error accessing auth store:", error);
  }

  // Try to get from auth token
  const token = localStorage.getItem("token");
  if (token) {
    try {
      // Decode JWT token to get user info
      const payload = JSON.parse(atob(token.split(".")[1]));
      return {
        username: payload.username || payload.name || payload.email || "",
        id: payload.user_id || payload.id || "",
      };
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  return { username: "", id: "" };
};

// Add defineEmits for event emission
const emit = defineEmits(["close", "bill-created"]);

// ESC key handler
const handleEscKey = (event) => {
  if (event.key === "Escape") {
    emit("close");
  }
};

// Fetch products on mount using inventory store
onMounted(async () => {
  await inventoryStore.fetchProducts();

  // Auto-populate billed by field with current user
  const currentUser = getCurrentUser();
  if (currentUser.username) {
    billedBy.value = currentUser.username;
    billedById.value = currentUser.id;
  }

  // Add ESC key listener
  document.addEventListener("keydown", handleEscKey);
});

// Cleanup event listener
onUnmounted(() => {
  document.removeEventListener("keydown", handleEscKey);
});

// Helper to get stock for a product
const getStock = (productId) => {
  const product = products.value.find((p) => p.id === productId);
  return product ? product.stock : 0;
};

// Helper to get price for a product (cost_price + margin)
const getProductPrice = (productId) => {
  const product = products.value.find((p) => p.id === productId);
  return product ? Number(product.cost_price) + Number(product.margin || 0) : 0;
};

// Helper to get unit for a product
const getProductUnit = (productId) => {
  const product = products.value.find((p) => p.id === productId);
  return product ? product.unit_name || product.unit || "pcs" : "pcs";
};

// Helper to get batch number and serial number for a product
const getProductBatch = (productId) => {
  const product = products.value.find((p) => p.id === productId);
  return product ? product.batch_number || "" : "";
};
const getProductSerial = (productId) => {
  const product = products.value.find((p) => p.id === productId);
  return product ? product.serial_number || "" : "";
};
// Add missing helper for product code
const getProductCode = (productId) => {
  const product = products.value.find((p) => p.id === productId);
  return product && product.code ? product.code : "";
};

// Compute the most common unit in the bill items, or "Mixed" if more than one
const unitLabel = computed(() => {
  const units = items.value
    .filter((item) => item.product_id)
    .map((item) => getProductUnit(item.product_id));
  if (units.length === 0) return "";
  const uniqueUnits = [...new Set(units)];
  return uniqueUnits.length === 1 ? uniqueUnits[0] : "Mixed";
});

// Watch for product selection and update price accordingly
const updateItemPrice = (index) => {
  const item = items.value[index];
  if (item.product_id) {
    item.price = getProductPrice(item.product_id);
    calculateRow(index);
  }
};

// Items data
const items = ref([
  {
    product_id: "",
    qty: 0,
    price: 0,
    discountPercent: 0,
    discountCheckbox: false,
    discountAmount: 0,
    vatPercent: 13, // Default VAT percentage
    vatCheckbox: false,
    vatAmount: 0,
    totalPrice: 0,
    description: "",
  },
]);

const addItem = (index) => {
  items.value.splice(index + 1, 0, {
    product_id: "",
    qty: 0,
    price: 0,
    discountPercent: 0,
    discountCheckbox: false,
    discountAmount: 0,
    vatPercent: 13, // Default VAT percentage
    vatCheckbox: false,
    vatAmount: 0,
    totalPrice: 0,
    description: "",
  });
};

const removeItem = (index) => {
  if (items.value.length > 1) items.value.splice(index, 1);
};

// Calculate row totals
const calculateRow = (index) => {
  const item = items.value[index];
  // Restrict qty to available stock and never allow negative
  const maxStock = getStock(item.product_id);
  if (item.qty < 0) {
    item.qty = 0;
  }
  if (item.qty > maxStock) {
    item.qty = maxStock;
  }
  const subtotal = item.qty * item.price;
  item.discountAmount = item.discountCheckbox
    ? Math.round(((subtotal * item.discountPercent) / 100) * 100) / 100
    : 0;
  const afterDiscount = subtotal - item.discountAmount;
  item.vatAmount = item.vatCheckbox
    ? Math.round(((afterDiscount * item.vatPercent) / 100) * 100) / 100
    : 0;
  item.totalPrice = Math.round((afterDiscount + item.vatAmount) * 100) / 100;
};

// Computed totals
const totalQuantity = computed(() =>
  items.value.reduce((sum, item) => sum + (item.qty || 0), 0),
);

const totalAmount = computed(
  () =>
    Math.round(
      items.value.reduce((sum, item) => sum + (item.qty * item.price || 0), 0) *
        100,
    ) / 100,
);

const totalDiscountAmount = computed(
  () =>
    Math.round(
      items.value.reduce((sum, item) => sum + (item.discountAmount || 0), 0) *
        100,
    ) / 100,
);

const totalTaxAmount = computed(
  () =>
    Math.round(
      items.value.reduce((sum, item) => sum + (item.vatAmount || 0), 0) * 100,
    ) / 100,
);

const grandTotal = computed(
  () =>
    Math.round(
      items.value.reduce((sum, item) => sum + (item.totalPrice || 0), 0) * 100,
    ) / 100,
);

// OnSubmit function for form submission
const router = useRouter();

const toast = useToast();

const onSubmit = async () => {
  try {
    // Validation checks
    if (!customerName.value.trim()) {
      toast.error("Customer name is required!", {
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });
      return;
    }

    if (!billDate.value) {
      toast.error("Bill date is required!", {
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });
      return;
    }

    if (!billedBy.value.trim()) {
      toast.error("Billed By field is required!", {
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });
      return;
    }

    // Check if at least one item is selected
    const validItems = items.value.filter(
      (item) => item.product_id && item.qty > 0,
    );
    if (validItems.length === 0) {
      toast.error("Please add at least one item with quantity!", {
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });
      return;
    }

    // Check for stock availability
    for (const item of validItems) {
      const stock = getStock(item.product_id);
      if (stock === 0) {
        toast.error("Stock is 0 for one or more selected products!", {
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
        return;
      }
      if (item.qty > stock) {
        toast.error("Quantity exceeds available stock for selected items!", {
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
        return;
      }
    }

    // Prepare items for API
    const billItems = validItems.map((item) => ({
      product_id: item.product_id,
      quantity: item.qty,
      unit_price: item.price,
      discount_amount: item.discountAmount,
      unit_total: item.totalPrice,
      batch: getProductBatch(item.product_id),
      serial_number: getProductSerial(item.product_id),
      code: getProductCode(item.product_id),
    }));

    const payload = {
      customer_Name: customerName.value,
      date: billDate.value,
      payment_method: paymentMethod.value,
      billed_by: billedById.value || billedBy.value, // Use ID if available, fallback to username
      vat_amount: totalTaxAmount.value,
      tax_amount: 0,
      bill_discount: totalDiscountAmount.value,
      actual_amount: totalAmount.value,
      recived_amount: grandTotal.value,
      grand_total: grandTotal.value,
      items: billItems,
    };

    const res = await billsStore.createBill(payload);
    if (res && res.id) {
      toast.success("Bill created successfully!", {
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });
      setTimeout(() => {
        emit("bill-created");
        emit("close");
      }, 1500);
    } else {
      toast.error("Failed to create bill. Please try again.", {
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });
    }
  } catch (error) {
    console.error("Error creating bill:", error);

    // Extract error message from response or fallback
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred. Please try again.";

    // Use useToast for error
    toast.error(errorMessage, {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
};
</script>

<style scoped>
/* Custom scrollbar for webkit browsers */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Hide number input spinners */
.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.no-spinner[type="number"] {
  -moz-appearance: textfield;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Focus styles */
input:focus,
select:focus,
textarea:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Enhanced mobile responsiveness */
@media (max-width: 640px) {
  .max-w-7xl {
    max-width: calc(100vw - 1rem);
  }

  .max-h-\[95vh\] {
    max-height: 95vh;
  }
}

/* Improved scrollbar for mobile */
@media (max-width: 768px) {
  .overflow-x-auto::-webkit-scrollbar {
    height: 4px;
  }

  .overflow-y-auto::-webkit-scrollbar {
    width: 4px;
  }
}
</style>
<style scoped>
/* Custom scrollbar for webkit browsers */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Hide number input spinners */
.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.no-spinner[type="number"] {
  -moz-appearance: textfield;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Focus styles */
input:focus,
select:focus,
textarea:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Enhanced mobile responsiveness */
@media (max-width: 640px) {
  .max-w-7xl {
    max-width: calc(100vw - 1rem);
  }

  .max-h-\[95vh\] {
    max-height: 95vh;
  }
}

/* Improved scrollbar for mobile */
@media (max-width: 768px) {
  .overflow-x-auto::-webkit-scrollbar {
    height: 4px;
  }

  .overflow-y-auto::-webkit-scrollbar {
    width: 4px;
  }
}
</style>
