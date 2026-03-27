<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-16">
    <Navbar />
    <div class="flex">
      <Sidebar />

      <!-- Main Content -->
      <main class="flex-1 ml-0 md:ml-64 h-[calc(100vh-4rem)] flex flex-col">
        <div class="p-2 sm:p-4 md:p-8 flex flex-col h-full">
          <!-- Header Section -->
          <div
            class="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 mb-4 md:mb-6 flex-shrink-0"
          >
            <div class="p-4 sm:p-6 lg:p-8">
              <div
                class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
              >
                <div>
                  <h1
                    class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text"
                  >
                    Billing Management
                  </h1>
                  <p class="text-gray-600 text-sm sm:text-base lg:text-lg">
                    Create and manage customer bills efficiently
                  </p>
                </div>

                <button
                  @click="openModal = true"
                  class="w-full lg:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 text-white font-medium rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  :style="{
                    backgroundColor: buttonColor,
                    color: getButtonTextColor(),
                  }"
                >
                  <svg
                    class="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span class="text-sm sm:text-base">Create Bill</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Bills Table -->
          <div
            class="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden min-h-0"
          >
            <!-- Filter Section -->
            <div class="p-4 border-b border-gray-200 flex-shrink-0">
              <div class="flex flex-col md:flex-row gap-3">
                <!-- Search Bar -->
                <div class="flex-1">
                  <div class="relative">
                    <span
                      class="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-18"
                    >
                      search
                    </span>
                    <input
                      v-model="searchQuery"
                      type="text"
                      placeholder="Search by customer name..."
                      class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <!-- Payment Method Filter -->
                <div class="w-full md:w-48">
                  <select
                    v-model="selectedPaymentFilter"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="">All Payments</option>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="online">Online</option>
                  </select>
                </div>

                <!-- Date Range Filter -->
                <div class="w-full md:w-48">
                  <input
                    v-model="dateFrom"
                    type="date"
                    placeholder="From Date"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div class="w-full md:w-48">
                  <input
                    v-model="dateTo"
                    type="date"
                    placeholder="To Date"
                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <!-- Clear Filters Button -->
                <button
                  v-if="
                    searchQuery || selectedPaymentFilter || dateFrom || dateTo
                  "
                  @click="clearFilters"
                  class="px-4 py-2.5 rounded-lg hover:opacity-80 transition-colors whitespace-nowrap"
                  :style="{
                    backgroundColor: buttonColor + '20',
                    color: buttonColor,
                  }"
                >
                  <span class="flex items-center">
                    <span class="material-icons text-18 mr-1">clear</span>
                    Clear
                  </span>
                </button>
              </div>

              <!-- Results Count -->
              <div class="mt-3 text-sm text-gray-600">
                Showing {{ filteredBills.length }} of {{ bills.length }} bills
              </div>
            </div>

            <!-- No Results Message -->
            <div
              v-if="filteredBills.length === 0"
              class="flex items-center justify-center flex-1"
            >
              <div class="text-center py-12">
                <div
                  class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <span class="material-icons text-48 text-gray-300">
                    search_off
                  </span>
                </div>
                <p class="text-lg font-semibold text-gray-900 mb-1">
                  No bills found
                </p>
                <p class="text-sm text-gray-500">
                  Try adjusting your filters or create a new bill
                </p>
              </div>
            </div>

            <!-- Mobile Cards View -->
            <div
              v-else
              class="block md:hidden flex-1 overflow-y-auto p-4 space-y-4"
            >
              <div
                v-for="(b, index) in paginatedBills"
                :key="b.id"
                class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div class="flex justify-between items-start mb-3">
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 text-lg">
                      Bill #{{ (currentPage - 1) * pageSize + index + 1 }}
                    </h3>
                    <p class="text-gray-600 text-sm">{{ b.customer_Name }}</p>
                  </div>
                  <button
                    @click="openPrintModal(b)"
                    class="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-700 transition"
                  >
                    Print
                  </button>
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-500">Date:</span>
                    <span class="text-gray-900 font-medium">{{ b.date }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Payment:</span>
                    <span class="text-gray-900 font-medium capitalize">{{
                      b.payment_method
                    }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Total:</span>
                    <span class="text-green-600 font-bold"
                      >Rs. {{ b.grand_total }}</span
                    >
                  </div>
                  <!-- <div class="pt-2 border-t border-gray-100">
                    <span class="text-gray-500 text-xs">Products:</span>
                    <p class="text-gray-900 text-sm mt-1">
                      <span v-if="b.items && b.items.length">
                        {{
                          b.items
                            .map(
                              (item) =>
                                productMap[item.product_id] || item.product_id,
                            )
                            .join(", ")
                        }}
                      </span>
                      <span v-else>-</span>
                    </p>
                  </div> -->
                </div>
              </div>
            </div>

            <!-- Desktop Table View -->
            <div
              v-if="filteredBills.length > 0"
              class="hidden md:block flex-1 overflow-auto"
            >
              <table
                class="w-full divide-y divide-gray-200 text-sm min-w-[800px]"
              >
                <thead
                  class="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0"
                >
                  <tr>
                    <th
                      class="px-4 py-4 text-left font-semibold text-gray-800 text-xs uppercase tracking-wider border-r border-gray-200"
                    >
                      SN
                    </th>
                    <!-- <th
                      class="px-4 py-4 text-left font-semibold text-gray-800 text-xs uppercase tracking-wider border-r border-gray-200"
                    >
                      Products
                    </th> -->
                    <!-- <th
                      class="px-4 py-4 text-left font-semibold text-gray-800 text-xs uppercase tracking-wider border-r border-gray-200"
                    >
                      Quantity
                    </th> -->
                    <th
                      class="px-4 py-4 text-left font-semibold text-gray-800 text-xs uppercase tracking-wider border-r border-gray-200"
                    >
                      Customer
                    </th>
                    <th
                      class="px-4 py-4 text-left font-semibold text-gray-800 text-xs uppercase tracking-wider border-r border-gray-200"
                    >
                      Date
                    </th>
                    <th
                      class="px-4 py-4 text-left font-semibold text-gray-800 text-xs uppercase tracking-wider border-r border-gray-200"
                    >
                      Payment Method
                    </th>
                    <th
                      class="px-4 py-4 text-left font-semibold text-gray-800 text-xs uppercase tracking-wider border-r border-gray-200"
                    >
                      Amount
                    </th>
                    <th
                      class="px-4 py-4 text-center font-semibold text-gray-800 text-xs uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                  <tr
                    v-for="(b, index) in paginatedBills"
                    :key="b.id"
                    class="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td class="px-4 py-4 whitespace-nowrap">
                      {{ (currentPage - 1) * pageSize + index + 1 }}
                    </td>
                    <!-- <td class="px-4 py-4 whitespace-nowrap">
                      <span v-if="b.items && b.items.length">
                        {{
                          b.items
                            .map(
                              (item) =>
                                productMap[item.product_id] || item.product_id,
                            )
                            .join(", ")
                        }}
                      </span>
                      <span v-else>-</span>
                    </td> 
                     <td class="px-4 py-4 whitespace-nowrap">
                      <span v-if="b.items && b.items.length">
                        {{ b.items.map((item) => item.quantity).join(", ") }}
                      </span>
                      <span v-else>-</span>
                    </td> -->
                    <td class="px-4 py-4 whitespace-nowrap">
                      {{ b.customer_Name }}
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap">
                      {{ b.date }}
                    </td>
                    <td
                      class="px-4 py-4 capitalize text-left whitespace-nowrap"
                    >
                      {{ b.payment_method }}
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap">
                      {{ b.grand_total }}
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-center">
                      <div class="flex justify-center gap-2">
                        <button
                          @click="openPrintModal(b)"
                          class="bg-white text-black px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                          title="Print Bill"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="paginatedBills.length === 0">
                    <td colspan="8" class="text-center py-16 text-gray-500">
                      <div
                        class="flex flex-col items-center justify-center space-y-4"
                      >
                        <div
                          class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center"
                        >
                          <svg
                            class="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p class="text-lg font-semibold text-gray-900 mb-1">
                            No bills found
                          </p>
                          <p class="text-sm text-gray-500">
                            Create your first bill to get started
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Mobile Pagination -->
            <div
              v-if="filteredBills.length > 0"
              class="block md:hidden bg-gradient-to-r from-gray-50 to-white px-4 py-3 border-t border-gray-200"
            >
              <div class="flex justify-between items-center">
                <button
                  class="px-3 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
                  :disabled="currentPage === 1"
                  @click="currentPage--"
                >
                  Prev
                </button>
                <span class="text-sm text-gray-700">
                  Page {{ currentPage }} of {{ totalPages }}
                </span>
                <button
                  class="px-3 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
                  :disabled="currentPage === totalPages"
                  @click="nextPage"
                >
                  Next
                </button>
              </div>
            </div>

            <!-- Desktop Pagination -->
            <div
              v-if="totalPages > 1 && filteredBills.length > 0"
              class="hidden md:block bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-t border-gray-200 flex-shrink-0"
            >
              <div
                class="flex flex-wrap justify-end items-center mt-4 space-x-2"
              >
                <button
                  class="px-3 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 transition-all duration-150"
                  :disabled="currentPage === 1"
                  @click="currentPage--"
                >
                  Prev
                </button>
                <template v-for="page in paginationPages" :key="page">
                  <span v-if="page === '...'">
                    <span class="px-2 text-gray-400">...</span>
                  </span>
                  <button
                    v-else
                    class="px-3 py-2 rounded-md text-sm font-medium"
                    :class="{
                      'bg-blue-600 text-white font-bold': currentPage === page,
                      'bg-gray-100 text-gray-700': currentPage !== page,
                    }"
                    @click="currentPage = page"
                  >
                    {{ page }}
                  </button>
                </template>
                <button
                  class="px-3 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 transition-all duration-150"
                  :disabled="currentPage === totalPages"
                  @click="nextPage"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Modals -->
    <create
      v-if="openModal"
      @close="openModal = false"
      @bill-created="onBillCreated"
    />
    <print-bill
      v-if="showPrintModal"
      :bill="selectedBill"
      :products="products"
      :user-map="userMap"
      @close="showPrintModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import { useAuthStore } from "@/stores/auth";
import create from "@/components/Bill/CreateBillModel.vue";
import printBill from "@/components/Bill/PrintBill.vue";
import { useBillsStore } from "@/stores/billsAPI";
import { useToast } from "vue-toast-notification";
import { useInventoryStore } from "@/stores/InventoryAPI";
import { useTheme } from "@/composables/useTheme";

const auth = useAuthStore();
const billsStore = useBillsStore();
const inventoryStore = useInventoryStore();
const { buttonColor, getButtonTextColor } = useTheme();

onMounted(async () => {
  if (!auth.user) {
    await auth.self();
  }
  await fetchBills();
  // Fetch products for name lookup
  products.value = await inventoryStore.fetchProducts();
  productMap.value = Object.fromEntries(
    products.value.map((p: any) => [String(p.id), p.name]),
  );

  // Create user map for username lookup
  createUserMap();
});

const openModal = ref(false);
const bills = computed(() => billsStore.bills);
const products = ref<any[]>([]);
const productMap = ref<Record<string, string>>({});
const userMap = ref<Record<string, string>>({});

// Filter state
const searchQuery = ref("");
const selectedPaymentFilter = ref("");
const dateFrom = ref("");
const dateTo = ref("");

// Create user map for username lookup
const createUserMap = () => {
  // Get current user info from localStorage
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.id) {
        const username =
          user.username ||
          user.name ||
          user.email ||
          user.first_name ||
          `User ${user.id}`;
        userMap.value[String(user.id)] = username;
      }
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  // Get from auth store if available
  try {
    if (auth.user) {
      const userId = auth.user.id;
      const username =
        auth.user.username ||
        auth.user.name ||
        auth.user.email ||
        auth.user.first_name ||
        `User ${userId}`;
      if (userId) {
        userMap.value[String(userId)] = username;
      }
    }
  } catch (error) {
    console.error("Error accessing auth store:", error);
  }

  // Get from auth token
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.user_id || payload.id;
      const username =
        payload.username || payload.name || payload.email || payload.first_name;
      if (userId && username) {
        userMap.value[String(userId)] = username;
      }
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }
};

// Filtered bills based on search and filters
const filteredBills = computed(() => {
  let filtered = [...bills.value];

  // Search filter - searches by customer name
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((bill) =>
      bill.customer_Name?.toLowerCase().includes(query),
    );
  }

  // Payment method filter
  if (selectedPaymentFilter.value) {
    filtered = filtered.filter(
      (bill) =>
        bill.payment_method?.toLowerCase() ===
        selectedPaymentFilter.value.toLowerCase(),
    );
  }

  // Date range filter
  if (dateFrom.value) {
    filtered = filtered.filter((bill) => {
      const billDate = new Date(bill.date);
      const fromDate = new Date(dateFrom.value);
      return billDate >= fromDate;
    });
  }

  if (dateTo.value) {
    filtered = filtered.filter((bill) => {
      const billDate = new Date(bill.date);
      const toDate = new Date(dateTo.value);
      toDate.setHours(23, 59, 59, 999); // Include the entire day
      return billDate <= toDate;
    });
  }

  return filtered;
});

// Pagination state
const pageSize = 10;
const currentPage = ref(1);

const paginatedBills = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredBills.value.slice(start, start + pageSize);
});

const totalPages = computed(() =>
  Math.ceil(filteredBills.value.length / pageSize),
);

// Pagination pages logic
const paginationPages = computed(() => {
  const pages = [];
  if (totalPages.value <= 7) {
    for (let i = 1; i <= totalPages.value; i++) pages.push(i);
  } else {
    if (currentPage.value <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages.value);
    } else if (currentPage.value >= totalPages.value - 3) {
      pages.push(
        1,
        "...",
        totalPages.value - 4,
        totalPages.value - 3,
        totalPages.value - 2,
        totalPages.value - 1,
        totalPages.value,
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage.value - 1,
        currentPage.value,
        currentPage.value + 1,
        "...",
        totalPages.value,
      );
    }
  }
  return pages;
});

// Reset to first page when filters change
watch([searchQuery, selectedPaymentFilter, dateFrom, dateTo], () => {
  currentPage.value = 1;
});

// Reset to first page when bills change
watch(bills, () => {
  currentPage.value = 1;
});

async function fetchBills() {
  try {
    await billsStore.fetchBills();
  } catch (error) {
    console.error("Error fetching bills:", error);
  }
}

const $toast = useToast();

// Add handler for bill-created event
function onBillCreated() {
  fetchBills();
  openModal.value = false;
  $toast.success("Bill created successfully!", {
    position: "top-right",
    duration: 3000,
    dismissible: true,
  });
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function clearFilters() {
  searchQuery.value = "";
  selectedPaymentFilter.value = "";
  dateFrom.value = "";
  dateTo.value = "";
  currentPage.value = 1;
}

const showPrintModal = ref(false);
const selectedBill = ref(null);

function openPrintModal(bill: any) {
  selectedBill.value = bill;
  showPrintModal.value = true;
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

.text-18 {
  font-size: 18px;
}

.text-48 {
  font-size: 48px;
}

.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
}

/* Unified scrollbar for billing */
.overflow-auto::-webkit-scrollbar,
.overflow-y-auto::-webkit-scrollbar,
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

.overflow-auto::-webkit-scrollbar-track,
.overflow-y-auto::-webkit-scrollbar-track,
.overflow-x-auto::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb,
.overflow-y-auto::-webkit-scrollbar-thumb,
.overflow-x-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  border-radius: 4px;
  border: 1px solid #f1f5f9;
}

.overflow-auto::-webkit-scrollbar-thumb:hover,
.overflow-y-auto::-webkit-scrollbar-thumb:hover,
.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #cbd5e1, #94a3b8);
}

/* Enhanced mobile responsiveness */
@media (max-width: 767px) {
  main {
    margin-left: 0;
  }
}

@media (max-width: 640px) {
  .min-h-screen {
    padding-top: 70px;
  }
}
</style>
