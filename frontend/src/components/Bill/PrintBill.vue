<template>
  <div
    class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
  >
    <div
      class="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden"
    >
      <!-- Header -->
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border-b border-gray-200 gap-3 sm:gap-0"
      >
        <h2 class="text-lg sm:text-xl font-semibold text-gray-900">
          Bill Preview
        </h2>
        <div class="flex space-x-2 w-full sm:w-auto">
          <button
            @click="printBill"
            class="flex-1 sm:flex-none bg-blue-600 text-white px-3 sm:px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
          >
            <svg
              class="w-4 h-4 inline mr-1 sm:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print
          </button>
          <button
            @click="$emit('close')"
            class="flex-1 sm:flex-none bg-gray-500 text-white px-3 sm:px-4 py-2 rounded text-sm hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </div>

      <!-- Print Content -->
      <div class="flex-1 overflow-y-auto p-3 sm:p-6">
        <div id="printable-bill" class="max-w-4xl mx-auto bg-white">
          <!-- Company Header -->
          <div
            class="text-center border-b-2 border-gray-300 pb-3 sm:pb-4 mb-4 sm:mb-6"
          >
            <h1 class="text-xl sm:text-2xl font-bold text-gray-800">
              ABC Stationary Store
            </h1>
            <p class="text-sm sm:text-base text-gray-600">Kathmandu, Nepal</p>
            <p class="text-xs sm:text-sm text-gray-600">
              Phone: +977-1-4123456 | Email: info@abcstationary.com
            </p>
            <div class="mt-1 sm:mt-2 text-xs text-gray-500">
              <p>VAT No: 123456789 | PAN No: 987654321</p>
            </div>
          </div>

          <!-- Bill Header -->
          <div
            class="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6 gap-4 sm:gap-0"
          >
            <div>
              <h2 class="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                SALES INVOICE
              </h2>
              <div class="text-xs sm:text-sm text-gray-600 space-y-1">
                <!-- <p><strong>Bill No:</strong> {{ bill.id }}</p> -->
                <p><strong>Date:</strong> {{ formatDate(bill.date) }}</p>
                <p>
                  <strong>Payment Method:</strong>
                  {{ bill.payment_method.toUpperCase() }}
                </p>
              </div>
            </div>
            <div
              class="text-left sm:text-right text-xs sm:text-sm text-gray-600 space-y-1"
            >
              <p><strong>Customer:</strong> {{ bill.customer_Name }}</p>
              <p>
                <strong>Billed By:</strong>
                {{ billedByUsername || bill.billed_by }}
              </p>
            </div>
          </div>

          <!-- Mobile Items Cards -->
          <div class="block sm:hidden mb-4 sm:mb-6">
            <h3 class="text-base font-semibold text-gray-800 mb-3">Items</h3>
            <div class="space-y-3">
              <div
                v-for="(item, index) in bill.items"
                :key="index"
                class="border border-gray-300 rounded-lg p-3 bg-gray-50"
              >
                <div class="flex justify-between items-start mb-2">
                  <span class="text-sm font-semibold text-gray-800"
                    >{{ index + 1 }}.
                    {{ getProductName(item.product_id) }}</span
                  >
                  <span class="text-sm font-bold text-blue-600">
                    Rs.
                    {{
                      formatPrice(
                        safeNumber(item.quantity) * safeNumber(item.unit_price),
                      )
                    }}
                  </span>
                </div>
                <div class="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>
                    <span class="font-medium">Qty:</span>
                    {{ safeNumber(item.quantity) }}
                  </div>
                  <div>
                    <span class="font-medium">Rate:</span> Rs.
                    {{ formatPrice(item.unit_price) }}
                  </div>
                </div>
                <div class="mt-2 text-xs text-gray-500 space-y-1">
                  <div v-if="getProductBatch(item)">
                    <span class="font-medium">Batch No:</span>
                    {{ getProductBatch(item) }}
                  </div>
                  <div v-if="getProductSerial(item)">
                    <span class="font-medium">Serial No:</span>
                    {{ getProductSerial(item) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Desktop Items Table -->
          <div class="hidden sm:block mb-4 sm:mb-6">
            <div class="overflow-x-auto">
              <table class="w-full border border-gray-300 min-w-[500px]">
                <thead>
                  <tr class="bg-gray-100">
                    <th
                      class="border border-gray-300 px-2 sm:px-3 py-2 text-left text-xs sm:text-sm"
                    >
                      SN
                    </th>
                    <th
                      class="border border-gray-300 px-2 sm:px-3 py-2 text-left text-xs sm:text-sm"
                    >
                      Product
                    </th>
                    <th
                      class="border border-gray-300 px-2 sm:px-3 py-2 text-left text-xs sm:text-sm"
                    >
                      Batch No
                    </th>
                    <th
                      class="border border-gray-300 px-2 sm:px-3 py-2 text-left text-xs sm:text-sm"
                    >
                      Serial No
                    </th>
                    <th
                      v-if="products.some((p) => p.code)"
                      class="border border-gray-300 px-2 sm:px-3 py-2 text-left text-xs sm:text-sm"
                    >
                      Code
                    </th>
                    <th
                      class="border border-gray-300 px-2 sm:px-3 py-2 text-center text-xs sm:text-sm"
                    >
                      Qty
                    </th>
                    <th
                      class="border border-gray-300 px-2 sm:px-3 py-2 text-center text-xs sm:text-sm"
                    >
                      Unit
                    </th>
                    <th
                      class="border border-gray-300 px-2 sm:px-3 py-2 text-right text-xs sm:text-sm"
                    >
                      Rate
                    </th>
                    <th
                      class="border border-gray-300 px-2 sm:px-3 py-2 text-right text-xs sm:text-sm"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in bill.items" :key="index">
                    <td
                      class="border border-gray-300 px-2 sm:px-3 py-2 text-xs sm:text-sm"
                    >
                      {{ index + 1 }}
                    </td>
                    <td
                      class="border border-gray-300 px-2 sm:px-3 py-2 text-xs sm:text-sm"
                    >
                      {{ getProductName(item.product_id) }}
                    </td>
                    <td
                      class="border border-gray-300 px-2 sm:px-3 py-2 text-xs sm:text-sm"
                    >
                      {{
                        item.batch_number || item.batch || getProductBatch(item)
                      }}
                    </td>
                    <td
                      class="border border-gray-300 px-2 sm:px-3 py-2 text-xs sm:text-sm"
                    >
                      {{ getProductSerial(item) }}
                    </td>
                    <td
                      v-if="
                        products.find((p) => p.id === item.product_id && p.code)
                      "
                      class="border border-gray-300 px-2 sm:px-3 py-2 text-xs sm:text-sm"
                    >
                      {{ getProductCode(item) }}
                    </td>
                    <td
                      class="border border-gray-300 px-2 sm:px-3 py-2 text-center text-xs sm:text-sm"
                    >
                      {{ safeNumber(item.quantity) }}
                    </td>
                    <td
                      class="border border-gray-300 px-2 sm:px-3 py-2 text-center text-xs sm:text-sm"
                    >
                      {{ getProductUnit(item.product_id) }}
                    </td>
                    <td
                      class="border border-gray-300 px-2 sm:px-3 py-2 text-right text-xs sm:text-sm"
                    >
                      Rs. {{ formatPrice(item.unit_price) }}
                    </td>
                    <td
                      class="border border-gray-300 px-2 sm:px-3 py-2 text-right text-xs sm:text-sm"
                    >
                      Rs.
                      {{
                        formatPrice(
                          safeNumber(item.quantity) *
                            safeNumber(item.unit_price),
                        )
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Bill Summary -->
          <!-- Mobile Summary -->
          <div class="block sm:hidden">
            <div class="border border-gray-300 rounded-lg overflow-hidden">
              <div class="bg-gray-100 px-3 py-2 border-b border-gray-300">
                <h3 class="font-semibold text-gray-800 text-sm">
                  Bill Summary
                </h3>
              </div>
              <div class="p-3 space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Total Quantity:</span>
                  <span class="font-medium">{{ totalQuantity }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Subtotal:</span>
                  <span class="font-medium"
                    >Rs. {{ formatPrice(subtotalAmount) }}</span
                  >
                </div>
                <div class="flex justify-between text-red-600">
                  <span>Discount:</span>
                  <span class="font-medium"
                    >- Rs.
                    {{ formatPrice(safeNumber(bill.bill_discount)) }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">VAT Amount:</span>
                  <span class="font-medium"
                    >Rs. {{ formatPrice(safeNumber(bill.vat_amount)) }}</span
                  >
                </div>
                <div class="border-t border-gray-300 pt-2 mt-2">
                  <div class="flex justify-between font-bold text-base">
                    <span>Grand Total:</span>
                    <span class="text-blue-600"
                      >Rs. {{ formatPrice(safeNumber(bill.grand_total)) }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Desktop Summary -->
          <div class="hidden sm:flex justify-end">
            <div class="w-full sm:w-64">
              <div class="border border-gray-300">
                <div class="bg-gray-100 px-4 py-2 border-b border-gray-300">
                  <h3 class="font-semibold text-gray-800">Bill Summary</h3>
                </div>
                <div class="p-4 space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Total Quantity:</span>
                    <span class="font-medium">{{ totalQuantity }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Subtotal:</span>
                    <span class="font-medium"
                      >Rs. {{ formatPrice(subtotalAmount) }}</span
                    >
                  </div>
                  <div class="flex justify-between text-red-600 text-sm">
                    <span>Discount:</span>
                    <span class="font-medium"
                      >- Rs.
                      {{ formatPrice(safeNumber(bill.bill_discount)) }}</span
                    >
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">VAT Amount:</span>
                    <span class="font-medium"
                      >Rs. {{ formatPrice(safeNumber(bill.vat_amount)) }}</span
                    >
                  </div>
                  <div class="border-t border-gray-300 pt-2 mt-2">
                    <div class="flex justify-between font-bold text-lg">
                      <span>Grand Total:</span>
                      <span class="text-blue-600"
                        >Rs.
                        {{ formatPrice(safeNumber(bill.grand_total)) }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-gray-300 text-center text-xs sm:text-sm text-gray-500"
          >
            <p>Thank you for your business!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  bill: {
    type: Object,
    required: true,
  },
  products: {
    type: Array,
    default: () => [],
  },
  userMap: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["close"]);

const billedByUsername = ref("");

// Get username from user ID with improved logic
const getUsernameFromId = (userId) => {
  // If it's already a string (username), return it
  if (isNaN(userId)) {
    return userId;
  }

  // Try to get from userMap prop first
  if (props.userMap && props.userMap[String(userId)]) {
    return props.userMap[String(userId)];
  }

  // Try to get from localStorage with better error handling
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.id == userId) {
        return (
          user.username ||
          user.name ||
          user.email ||
          user.first_name ||
          `User ${userId}`
        );
      }
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  // Try to get from auth token with better error handling
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.user_id == userId || payload.id == userId) {
        return (
          payload.username ||
          payload.name ||
          payload.email ||
          payload.first_name ||
          `User ${userId}`
        );
      }
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }

  // If we can't find the username, return a fallback
  return `User ${userId}`;
};

onMounted(() => {
  if (props.bill.billed_by) {
    billedByUsername.value = getUsernameFromId(props.bill.billed_by);
  }

  // Add ESC key listener
  document.addEventListener("keydown", handleEscKey);
});

// Cleanup event listener
onUnmounted(() => {
  document.removeEventListener("keydown", handleEscKey);
});

// ESC key handler
const handleEscKey = (event) => {
  if (event.key === "Escape") {
    emit("close");
  }
};

// Helper function to safely convert to number
const safeNumber = (value) => {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};

// Helper function to format price with proper decimal places
const formatPrice = (value) => {
  return safeNumber(value).toFixed(2);
};

// Get product name from product ID
const getProductName = (productId) => {
  const product = props.products.find((p) => p.id === productId);
  return product ? product.name : `Product ${productId}`;
};

// Update getProductBatch to support batch_number field
const getProductBatch = (item) =>
  item.batch_number ||
  item.batch ||
  props.products.find((p) => p.id === item.product_id)?.batch_number ||
  "";
const getProductSerial = (item) =>
  item.serial_number ||
  props.products.find((p) => p.id === item.product_id)?.serial_number ||
  "";
const getProductCode = (item) => {
  const product = props.products.find((p) => p.id === item.product_id);
  return product && product.code ? product.code : "";
};
const getProductUnit = (productId) => {
  const product = props.products.find((p) => p.id === productId);
  return product ? product.unit_name || product.unit || "pcs" : "pcs";
};

// Calculate total quantity
const totalQuantity = computed(() => {
  if (!props.bill.items || !Array.isArray(props.bill.items)) return 0;
  return props.bill.items.reduce(
    (sum, item) => sum + safeNumber(item.quantity),
    0,
  );
});

// Calculate subtotal (before discount and VAT)
const subtotalAmount = computed(() => {
  if (!props.bill.items || !Array.isArray(props.bill.items)) return 0;
  return props.bill.items.reduce((sum, item) => {
    return sum + safeNumber(item.quantity) * safeNumber(item.unit_price);
  }, 0);
});

// Format date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return dateString;
  }
};

// Print function
const printBill = () => {
  const printContent = document.getElementById("printable-bill");
  if (!printContent) return;

  const originalContent = document.body.innerHTML;

  document.body.innerHTML = printContent.outerHTML;

  // Add print styles
  const style = document.createElement("style");
  style.textContent = `
    @media print {
      body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
      .no-print { display: none !important; }
    }
  `;
  document.head.appendChild(style);

  window.print();

  document.body.innerHTML = originalContent;
  window.location.reload(); // Reload to restore Vue functionality
};
</script>

<style scoped>
/* Enhanced mobile responsiveness */
@media (max-width: 640px) {
  .max-w-5xl {
    max-width: calc(100vw - 1rem);
  }

  .max-h-\[95vh\] {
    max-height: 95vh;
  }
}

/* Print styles for mobile */
@media print {
  .fixed,
  .bg-gray-900 {
    display: none !important;
  }

  #printable-bill {
    margin: 0;
    padding: 10px;
    font-size: 12px;
  }

  .text-xl {
    font-size: 18px !important;
  }
  .text-lg {
    font-size: 16px !important;
  }
  .text-base {
    font-size: 14px !important;
  }
  .text-sm {
    font-size: 12px !important;
  }
  .text-xs {
    font-size: 10px !important;
  }
}

/* Improved scrollbar for mobile */
.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

@media (max-width: 768px) {
  .overflow-x-auto::-webkit-scrollbar,
  .overflow-y-auto::-webkit-scrollbar {
    display: none;
  }
}
</style>
