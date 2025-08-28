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
              <tr v-for="(b, index) in bills" :key="b.id">
                <td class="px-4 py-2 text-sm">{{ index + 1 }}</td>
                <td class="px-4 py-2 text-sm">{{ b.customer_Name }}</td>
                <td class="px-4 py-2 text-sm">{{ b.date }}</td>
                <td class="px-4 py-2 text-sm capitalize">
                  {{ b.payment_method }}
                </td>
                <td class="px-4 py-2 text-sm">{{ b.amount }}</td>
              </tr>
              <tr v-if="bills.length === 0">
                <td colspan="5" class="text-center py-4 text-gray-500">
                  No bills found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
    <create v-if="openModal" @close="openModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import { useAuthStore } from "@/stores/auth";
import create from "@/views/Billing/create.vue";
import axios from "axios";

const auth = useAuthStore();
onMounted(async () => {
  if (!auth.user) {
    await auth.self();
  }
  await fetchBills();
});

const openModal = ref(false);

const bills = ref<any[]>([]);

const bill = ref({
  customer_Name: "",
  date: new Date().toISOString().substr(0, 10),
  payment_method: "",
  amount: 0,
});

async function fetchBills() {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/api/bills/", {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
    bills.value = res.data;
  } catch (error) {
    console.error("Error fetching bills:", error);
  }
}

async function submitBill() {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post("/api/bills/", bill.value, {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
    bills.value.push(res.data); // add to list
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
