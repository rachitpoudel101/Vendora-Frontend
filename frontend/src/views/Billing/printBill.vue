<template>
  <div
    class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
  >
    <div
      class="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between p-4 border-b border-gray-200"
      >
        <h2 class="text-xl font-semibold text-gray-900">Bill Preview</h2>
        <div class="flex space-x-2">
          <button
            @click="printBill"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Print Bill
          </button>
          <button
            @click="$emit('close')"
            class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </div>

      <!-- Print Content -->
      <div class="flex-1 overflow-y-auto p-6">
        <div id="printable-bill" class="max-w-3xl mx-auto bg-white">
          <!-- Company Header -->
          <div class="text-center border-b-2 border-gray-300 pb-4 mb-6">
            <h1 class="text-2xl font-bold text-gray-800">
              ABC Stationary Store
            </h1>
            <p class="text-gray-600">Kathmandu, Nepal</p>
            <p class="text-gray-600">
              Phone: +977-1-4123456 | Email: info@abcstationary.com
            </p>
            <div class="mt-2 text-sm text-gray-500">
              <p>VAT No: 123456789 | PAN No: 987654321</p>
            </div>
          </div>

          <!-- Bill Header -->
          <div class="flex justify-between items-start mb-6">
            <div>
              <h2 class="text-xl font-semibold text-gray-800 mb-2">
                SALES INVOICE
              </h2>
              <div class="text-sm text-gray-600">
                <p><strong>Bill No:</strong> {{ bill.id }}</p>
                <p><strong>Date:</strong> {{ formatDate(bill.date) }}</p>
                <p>
                  <strong>Payment Method:</strong>
                  {{ bill.payment_method.toUpperCase() }}
                </p>
              </div>
            </div>
            <div class="text-right text-sm text-gray-600">
              <p><strong>Customer:</strong> {{ bill.customer_Name }}</p>
              <p><strong>Billed By:</strong> {{ billedByUsername || bill.billed_by }}</p>
            </div>
          </div>

          <!-- Items Table -->
          <div class="mb-6">
            <table class="w-full border border-gray-300">
              <thead>
                <tr class="bg-gray-100">
                  <th class="border border-gray-300 px-3 py-2 text-left">SN</th>
                  <th class="border border-gray-300 px-3 py-2 text-left">
                    Product
                  </th>
                  <th class="border border-gray-300 px-3 py-2 text-center">
                    Qty
                  </th>
                  <th class="border border-gray-300 px-3 py-2 text-right">
                    Rate
                  </th>
                  <th class="border border-gray-300 px-3 py-2 text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in bill.items" :key="index">
                  <td class="border border-gray-300 px-3 py-2">
                    {{ index + 1 }}
                  </td>
                  <td class="border border-gray-300 px-3 py-2">
                    {{ getProductName(item.product_id) }}
                  </td>
                  <td class="border border-gray-300 px-3 py-2 text-center">
                    {{ safeNumber(item.quantity) }}
                  </td>
                  <td class="border border-gray-300 px-3 py-2 text-right">
                    Rs. {{ formatPrice(item.unit_price) }}
                  </td>
                  <td class="border border-gray-300 px-3 py-2 text-right">
                    Rs.
                    {{
                      formatPrice(
                        safeNumber(item.quantity) * safeNumber(item.unit_price),
                      )
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Bill Summary -->
          <div class="flex justify-end">
            <div class="w-64">
              <div class="border border-gray-300">
                <div class="bg-gray-100 px-4 py-2 border-b border-gray-300">
                  <h3 class="font-semibold text-gray-800">Bill Summary</h3>
                </div>
                <div class="p-4 space-y-2">
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
            class="mt-8 pt-4 border-t border-gray-300 text-center text-sm text-gray-500"
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
        return user.username || user.name || user.email || user.first_name || `User ${userId}`;
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
        return payload.username || payload.name || payload.email || payload.first_name || `User ${userId}`;
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
@media print {
  .fixed,
  .bg-gray-900 {
    display: none !important;
  }
}
</style>
