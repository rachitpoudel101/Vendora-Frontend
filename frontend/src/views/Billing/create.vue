<template>
  <div
    class="fixed inset-0 bg-white z-40 flex flex-col shadow-xl w-full h-full"
  >
    <!-- Toast Notification -->
    <div
      v-if="showToast"
      class="fixed top-6 right-6 bg-red-600 text-white px-4 py-2 rounded shadow z-50"
    >
      Stock is 0 for one or more selected products!
    </div>
    <!-- Header -->
    <div
      class="flex items-center justify-between p-5 border-b border-gray-200 bg-white"
    >
      <div class="flex items-center space-x-2 text-m text-gray-600">
        <span>Purchase Bills</span>
        <span>&gt;</span>
        <span class="font-medium text-gray-900">Create</span>
      </div>
      <button class="text-gray-400 hover:text-gray-600" @click="$emit('close')">
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

    <div class="flex-1 overflow-y-auto p-2 md:p-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-6">
        <!-- Main Form Section -->
        <div class="lg:col-span-2 space-y-4 md:space-y-6">
          <!-- Top Form Fields -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
            <!-- Customer Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Customer Name <span class="text-red-500">*</span>
              </label>
              <div class="flex">
                <input
                  v-model="customerName"
                  type="text"
                  class="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <!-- Bill Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Bill date <span class="text-red-500">*</span>
              </label>
              <div class="flex">
                <input
                  v-model="billDate"
                  type="date"
                  class="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  class="bg-gray-100 border border-l-0 border-gray-300 px-3 py-2 rounded-r-md text-sm text-gray-600"
                >
                  AD
                </button>
              </div>
            </div>
            <!-- Payment Method -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Payment Method <span class="text-red-500">*</span>
              </label>
              <select
                v-model="paymentMethod"
                class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="cash">Cash</option>
                <option value="online">Online</option>
              </select>
            </div>
          </div>

          <!-- Items Table -->
          <div class="overflow-x-auto max-w-full scrollbar-hide">
            <table
              class="w-full min-w-[480px] md:min-w-full border border-gray-300 text-xs md:text-sm"
            >
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="border border-gray-300 px-1 md:px-2 py-1 md:py-2 text-left font-medium text-gray-700"
                  >
                    SN
                  </th>
                  <th
                    class="border border-gray-300 px-1 md:px-2 py-1 md:py-2 text-left font-medium text-gray-700"
                  >
                    Item
                  </th>
                  <th
                    class="border border-gray-300 px-1 md:px-2 py-1 md:py-2 text-left font-medium text-gray-700"
                  >
                    Qty
                  </th>
                  <th
                    class="border border-gray-300 px-1 md:px-2 py-1 md:py-2 text-left font-medium text-gray-700"
                  >
                    Price
                  </th>
                  <th
                    class="border border-gray-300 px-1 md:px-2 py-1 md:py-2 text-left font-medium text-gray-700"
                  >
                    Dis Amt.
                  </th>
                  <th
                    class="border border-gray-300 px-1 md:px-2 py-1 md:py-2 text-left font-medium text-gray-700"
                  >
                    Vat Amount
                  </th>
                  <th
                    class="border border-gray-300 px-1 md:px-2 py-1 md:py-2 text-left font-medium text-gray-700"
                  >
                    Total Price
                  </th>
                  <th
                    class="border border-gray-300 px-1 md:px-2 py-1 md:py-2 text-left font-medium text-gray-700"
                  >
                    Description
                  </th>
                  <th
                    class="border border-gray-300 px-1 md:px-2 py-1 md:py-2 text-center font-medium text-gray-700"
                  >
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in items"
                  :key="index"
                  class="hover:bg-gray-50"
                >
                  <td class="border border-gray-300 px-2 py-2">
                    {{ index + 1 }}.
                  </td>
                  <td class="border border-gray-300 px-2 py-2">
                    <div class="flex">
                      <select
                        v-model="item.product_id"
                        class="flex-1 border-0 focus:outline-none text-sm"
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
                        class="text-blue-500 hover:text-blue-700 ml-1"
                        @click="addItem(index)"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td class="border border-gray-300 px-2 py-2">
                    <input
                      v-model="item.qty"
                      type="number"
                      :max="getStock(item.product_id)"
                      min="0"
                      class="w-full border-0 focus:outline-none text-sm text-center"
                      @input="calculateRow(index)"
                    />
                    <span
                      v-if="item.product_id"
                      class="text-xs text-gray-500 ml-1"
                    >
                      (Stock: {{ getStock(item.product_id) }})
                    </span>
                  </td>
                  <td class="border border-gray-300 px-2 py-2">
                    <input
                      v-model="item.price"
                      type="number"
                      step="0.01"
                      min="0"
                      class="w-full border-0 focus:outline-none text-sm text-right"
                      @input="calculateRow(index)"
                      readonly
                    />
                  </td>
                  <td
                    class="border border-gray-300 px-2 py-2 text-right text-gray-600"
                  >
                    <input
                      type="checkbox"
                      v-model="item.discountCheckbox"
                      @change="calculateRow(index)"
                    />
                    <span v-if="item.discountCheckbox">
                      <input
                        v-model.number="item.discountPercent"
                        type="number"
                        min="0"
                        max="100"
                        class="w-14 border border-gray-300 rounded px-1 py-0.5 text-xs text-right mx-1"
                        @input="calculateRow(index)"
                        @change="calculateRow(index)"
                        placeholder="%"
                        style="width: 40px"
                      />
                      %
                    </span>
                    {{ item.discountAmount.toFixed(2) }}
                  </td>
                  <td
                    class="border border-gray-300 px-2 py-2 text-right text-gray-600"
                  >
                    {{ item.vatAmount.toFixed(2) }}
                  </td>
                  <td
                    class="border border-gray-300 px-2 py-2 text-right font-medium"
                  >
                    {{ item.totalPrice.toFixed(2) }}
                  </td>
                  <td class="border border-gray-300 px-2 py-2">
                    <input
                      v-model="item.description"
                      type="text"
                      class="w-full border-0 focus:outline-none text-sm"
                    />
                  </td>
                  <td class="border border-gray-300 px-2 py-2 text-center">
                    <button
                      class="bg-red-600 text-white px-3 py-1 rounded-full font-bold text-lg shadow hover:bg-red-700 transition disabled:opacity-50"
                      @click="removeItem(index)"
                      :disabled="items.length === 1"
                      title="Remove item"
                    >
                      -
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Remarks -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Remarks</label
            >
            <textarea
              v-model="remarks"
              rows="4"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter any additional remarks..."
            ></textarea>
          </div>
        </div>

        <!-- Bill Summary Section -->
        <div class="lg:col-span-1 mt-4 md:mt-0 w-full">
          <div
            class="bg-blue-600 text-white px-2 md:px-4 py-2 md:py-3 rounded-t-md"
          >
            <h3 class="font-medium">Bill Summary</h3>
          </div>
          <div
            class="border border-t-0 border-gray-300 rounded-b-md p-2 md:p-4 space-y-2 md:space-y-4"
          >
            <!-- Total Quantity -->
            <div class="flex justify-between items-center">
              <label class="text-sm text-gray-700">Total Quantity:</label>
              <div class="flex items-center">
                <span class="text-sm font-medium mr-2">{{
                  totalQuantity
                }}</span>
                <select
                  class="border border-gray-300 rounded text-xs px-1 py-1"
                >
                  <option>-</option>
                </select>
              </div>
            </div>

            <!-- Amount -->
            <div class="flex justify-between items-center">
              <label class="text-sm text-gray-700">Amount:</label>
              <div class="flex items-center">
                <span class="text-xs text-gray-500 mr-1">Rs.</span>
                <span class="text-sm font-medium">{{
                  totalAmount.toFixed(2)
                }}</span>
              </div>
            </div>

            <!-- Dis Amt -->
            <div class="flex justify-between items-center">
              <label class="text-sm text-gray-700">Dis Amt.:</label>
              <div class="flex items-center">
                <span class="text-xs text-gray-500 mr-1">Rs.</span>
                <span class="text-sm font-medium">{{
                  totalDiscountAmount.toFixed(2)
                }}</span>
              </div>
            </div>

            <!-- Vat Amount -->
            <div class="flex justify-between items-center">
              <label class="text-sm text-gray-700">Vat Amount:</label>
              <div class="flex items-center">
                <span class="text-xs text-gray-500 mr-1">Rs.</span>
                <span class="text-sm font-medium">{{
                  totalTaxAmount.toFixed(2)
                }}</span>
              </div>
            </div>

            <!-- Total Amount -->
            <div
              class="flex justify-between items-center pt-2 border-t border-gray-200"
            >
              <label class="text-sm font-medium text-gray-700"
                >Total Amt:</label
              >
              <div class="flex items-center">
                <span class="text-xs text-gray-500 mr-1">Rs.</span>
                <span class="text-sm font-bold">{{
                  grandTotal.toFixed(2)
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div
        class="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-3 mt-4 md:mt-6 pt-2 md:pt-4 border-t border-gray-200"
      >
        <button
          class="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          @click="$emit('close')"
        >
          Close
        </button>
        <button
          class="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          @click="onSubmit"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { createBills } from "@/stores/billsAPI";
import { fetchProduct } from "@/stores/InventoryAPI";

// Form data
const customerName = ref("");
const billDate = ref(new Date().toISOString().substr(0, 10)); // <-- default to today
const paymentMethod = ref("cash");
const remarks = ref("");

// Products for dropdown
const products = ref([]);

// Fetch products on mount using inventory store
onMounted(async () => {
  products.value = await fetchProduct();
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
    qty: 0, // <-- default to 0
    price: 0,
    discountPercent: 0,
    discountCheckbox: false,
    discountAmount: 0,
    vatPercent: 0,
    vatAmount: 0,
    totalPrice: 0,
    description: "",
  },
]);

const addItem = (index) => {
  items.value.splice(index + 1, 0, {
    product_id: "",
    qty: 0, // <-- default to 0
    price: 0,
    discountPercent: 0,
    discountCheckbox: false,
    discountAmount: 0,
    vatPercent: 0,
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
    ? (subtotal * item.discountPercent) / 100
    : 0;
  const afterDiscount = subtotal - item.discountAmount;
  item.vatAmount = (afterDiscount * item.vatPercent) / 100;
  item.totalPrice = afterDiscount + item.vatAmount;
};

// Computed totals
const totalQuantity = computed(() =>
  items.value.reduce((sum, item) => sum + (item.qty || 0), 0),
);

const totalAmount = computed(() =>
  items.value.reduce((sum, item) => sum + (item.qty * item.price || 0), 0),
);

const totalDiscountAmount = computed(() =>
  items.value.reduce((sum, item) => sum + (item.discountAmount || 0), 0),
);

const totalTaxAmount = computed(() =>
  items.value.reduce((sum, item) => sum + (item.vatAmount || 0), 0),
);

const grandTotal = computed(() =>
  items.value.reduce((sum, item) => sum + (item.totalPrice || 0), 0),
);

// OnSubmit function for form submission
const router = useRouter();

const showToast = ref(false);
let toastTimeout = null;

// Add defineEmits for event emission
const emit = defineEmits(["close", "bill-created"]);

const onSubmit = async () => {
  // Prepare items for API
  const billItems = items.value.map((item) => ({
    product_id: item.product_id,
    quantity: item.qty,
    unit_price: item.price,
    discount_amount: item.discountAmount,
    unit_total: item.totalPrice,
    // description: item.description // if needed
  }));
  const payload = {
    customer_Name: customerName.value,
    date: billDate.value,
    payment_method: paymentMethod.value,
    vat_amount: totalTaxAmount.value,
    tax_amount: 0,
    bill_discount: totalDiscountAmount.value,
    actual_amount: totalAmount.value,
    recived_amount: grandTotal.value,
    grand_total: grandTotal.value,
    items: billItems,
  };
  try {
    const res = await createBills(payload);
    if (res && res.id) {
      emit("bill-created");
      emit("close");
      $toast.success("Bill created successfully");
    }
  } catch (e) {
    $toast.error("Failed to create bill");
  }
};
</script>

<style>
/* ...existing code... */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
/* ...existing code... */
</style>
