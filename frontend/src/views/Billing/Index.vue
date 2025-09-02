<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    <div class="flex flex-1 h-0">
      <Sidebar />

      <main class="flex-1 flex flex-col px-2 md:px-6 py-4 md:py-10">
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-2"
        >
          <h2 class="text-2xl md:text-3xl font-bold text-blue-700">Billing</h2>
          <button
            @click="openModal = true"
            class="bg-blue-600 text-white px-3 md:px-4 py-2 rounded hover:bg-blue-700 transition w-full md:w-auto"
          >
            Create Bill
          </button>
        </div>

        <!-- Bills Table -->
        <div
          class="bg-white shadow rounded p-1 md:p-2 overflow-x-auto max-w-full scrollbar-hide"
        >
          <div class="w-full">
            <table
              class="w-full min-w-[480px] md:min-w-[600px] divide-y divide-gray-200 text-base md:text-lg"
            >
              <thead>
                <tr>
                  <th
                    class="px-2 md:px-4 py-2 text-left font-semibold text-gray-800 bg-gray-200 border-b border-gray-300 border-r whitespace-nowrap"
                  >
                    SN
                  </th>
                  <th
                    class="px-2 md:px-4 py-2 text-left font-semibold text-gray-800 bg-gray-200 border-b border-gray-300 border-r whitespace-nowrap"
                  >
                    Products
                  </th>
                  <th
                    class="px-2 md:px-4 py-2 text-left font-semibold text-gray-800 bg-gray-200 border-b border-gray-300 border-r whitespace-nowrap"
                  >
                    Quantity
                  </th>
                  <th
                    class="px-2 md:px-4 py-2 text-left font-semibold text-gray-800 bg-gray-200 border-b border-gray-300 border-r whitespace-nowrap"
                  >
                    Customer
                  </th>
                  <th
                    class="px-2 md:px-4 py-2 text-left font-semibold text-gray-800 bg-gray-200 border-b border-gray-300 border-r whitespace-nowrap"
                  >
                    Date
                  </th>
                  <th
                    class="px-2 md:px-4 py-2 text-left font-semibold text-gray-800 bg-gray-200 border-b border-gray-300 border-r whitespace-nowrap"
                  >
                    Payment Method
                  </th>
                  <th
                    class="px-2 md:px-4 py-2 text-left font-semibold text-gray-800 bg-gray-200 border-b border-gray-300 whitespace-nowrap"
                  >
                    Amount
                  </th>
                  <th
                    class="px-2 md:px-4 py-2 text-left font-semibold text-gray-800 bg-gray-200 border-b border-gray-300 whitespace-nowrap"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="(b, index) in paginatedBills" :key="b.id">
                  <td class="px-2 md:px-4 py-2 whitespace-nowrap">
                    {{ (currentPage - 1) * pageSize + index + 1 }}
                  </td>
                  <td class="px-2 md:px-4 py-2 whitespace-nowrap">
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
                  <td class="px-2 md:px-4 py-2 whitespace-nowrap">
                    <span v-if="b.items && b.items.length">
                      {{ b.items.map((item) => item.quantity).join(", ") }}
                    </span>
                    <span v-else>-</span>
                  </td>
                  <td class="px-2 md:px-4 py-2 whitespace-nowrap">
                    {{ b.customer_Name }}
                  </td>
                  <td class="px-2 md:px-4 py-2 whitespace-nowrap">
                    {{ b.date }}
                  </td>
                  <td
                    class="px-2 md:px-4 py-2 capitalize text-left whitespace-nowrap"
                  >
                    {{ b.payment_method }}
                  </td>
                  <td class="px-2 md:px-4 py-2 whitespace-nowrap">
                    {{ b.grand_total }}
                  </td>
                  <td class="px-2 md:px-4 py-2 whitespace-nowrap">
                    <button
                      @click="openPrintModal(b)"
                      class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition"
                      title="Print Bill"
                    >
                      Print
                    </button>
                  </td>
                </tr>
                <tr v-if="paginatedBills.length === 0">
                  <td colspan="8" class="text-center py-4 text-gray-500">
                    No bills found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Pagination Controls -->
          <div
            v-if="totalPages > 1"
            class="flex flex-wrap justify-end items-center mt-4 space-x-2"
          >
            <button
              class="px-2 md:px-3 py-1 rounded border bg-gray-100 text-gray-700"
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
                class="px-2 md:px-3 py-1 rounded border"
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
              class="px-2 md:px-3 py-1 rounded border bg-gray-100 text-gray-700"
              :disabled="currentPage === totalPages"
              @click="nextPage"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
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
import create from "@/views/Billing/create.vue";
import printBill from "@/views/Billing/printBill.vue";
import { fetchBill } from "@/stores/billsAPI";
import { fetchProduct } from "@/stores/InventoryAPI";
import { useToast } from "vue-toast-notification";

const auth = useAuthStore();
onMounted(async () => {
  if (!auth.user) {
    await auth.self();
  }
  await fetchBills();
  // Fetch products for name lookup
  products.value = await fetchProduct();
  productMap.value = Object.fromEntries(
    products.value.map((p: any) => [String(p.id), p.name]),
  );
  
  // Create user map for username lookup
  createUserMap();
});

const openModal = ref(false);
const bills = ref<any[]>([]);
const products = ref<any[]>([]);
const productMap = ref<Record<string, string>>({});
const userMap = ref<Record<string, string>>({});

// Create user map for username lookup
const createUserMap = () => {
  // Get current user info from localStorage
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.id) {
        const username = user.username || user.name || user.email || user.first_name || `User ${user.id}`;
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
      const username = auth.user.username || auth.user.name || auth.user.email || auth.user.first_name || `User ${userId}`;
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
      const username = payload.username || payload.name || payload.email || payload.first_name;
      if (userId && username) {
        userMap.value[String(userId)] = username;
      }
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }
};

// Pagination state
const pageSize = 10;
const currentPage = ref(1);

const paginatedBills = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return bills.value.slice(start, start + pageSize);
});
const totalPages = computed(() => Math.ceil(bills.value.length / pageSize));

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

// Reset to first page when bills change
watch(bills, () => {
  currentPage.value = 1;
});

async function fetchBills() {
  try {
    bills.value = await fetchBill();
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

const showPrintModal = ref(false);
const selectedBill = ref(null);

function openPrintModal(bill: any) {
  selectedBill.value = bill;
  showPrintModal.value = true;
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
