<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    <div class="flex flex-1 h-0">
      <Sidebar />

      <main class="flex-1 flex flex-col px-6 py-10">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-3xl font-bold text-blue-700">Billing</h2>
          <button
            @click="openModal = true"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Create Bill
          </button>
        </div>

        <!-- Bills Table -->
        <div class="bg-white shadow rounded p-4 overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-100">
              <tr>
                <th
                  class="px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  SN
                </th>
                <th
                  class="px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  Products
                </th>
                <th
                  class="px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  Quantity
                </th>
                <th
                  class="px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  Customer
                </th>
                <th
                  class="px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  Date
                </th>
                <th
                  class="px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  Payment Method
                </th>
                <th
                  class="px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(b, index) in paginatedBills" :key="b.id">
                <td class="px-4 py-2 text-sm">
                  {{ (currentPage - 1) * pageSize + index + 1 }}
                </td>
                <td class="px-4 py-2 text-sm">
                  <!-- Show product names for this bill -->
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
                <td class="px-4 py-2 text-sm">
                  <span v-if="b.items && b.items.length">
                    {{ b.items.map((item) => item.quantity).join(", ") }}
                  </span>
                  <span v-else>-</span>
                </td>
                <td class="px-4 py-2 text-sm">{{ b.customer_Name }}</td>
                <td class="px-4 py-2 text-sm">{{ b.date }}</td>
                <td class="px-4 py-2 text-sm capitalize">
                  {{ b.payment_method }}
                </td>
                <td class="px-4 py-2 text-sm">{{ b.grand_total }}</td>
              </tr>
              <tr v-if="paginatedBills.length === 0">
                <td colspan="7" class="text-center py-4 text-gray-500">
                  No bills found.
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination Controls -->
          <div
            v-if="totalPages > 1"
            class="flex justify-end items-center mt-4 space-x-2"
          >
            <button
              class="px-3 py-1 rounded border bg-gray-100 text-gray-700"
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
                class="px-3 py-1 rounded border"
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
              class="px-3 py-1 rounded border bg-gray-100 text-gray-700"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import { useAuthStore } from "@/stores/auth";
import create from "@/views/Billing/create.vue";
import { fetchBill, createBills } from "@/stores/billsAPI";
import { fetchProduct } from "@/stores/InventoryAPI";

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
});

const openModal = ref(false);
const bills = ref<any[]>([]);
const products = ref<any[]>([]);
const productMap = ref<Record<string, string>>({});

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
      pages.push(1, "...", totalPages.value - 4, totalPages.value - 3, totalPages.value - 2, totalPages.value - 1, totalPages.value);
    } else {
      pages.push(1, "...", currentPage.value - 1, currentPage.value, currentPage.value + 1, "...", totalPages.value);
    }
  }
  return pages;
});

// Reset to first page when bills change
watch(bills, () => {
  currentPage.value = 1;
});

const bill = ref({
  customer_Name: "",
  date: new Date().toISOString().substr(0, 10),
  payment_method: "",
  amount: 0,
});

async function fetchBills() {
  try {
    bills.value = await fetchBill();
  } catch (error) {
    console.error("Error fetching bills:", error);
  }
}

// Add handler for bill-created event
function onBillCreated() {
  fetchBills();
  openModal.value = false;
}

async function submitBill() {
  try {
    const res = await createBills(bill.value);
    bills.value.push(res); // add to list
    openModal.value = false;
    // Reset form
    bill.value = {
      customer_Name: "",
      date: new Date().toISOString().substr(0, 10),
      payment_method: "",
      amount: 0,
    };
  } catch (error) {
    console.error("Error creating bill:", error);
  }
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
</style>
