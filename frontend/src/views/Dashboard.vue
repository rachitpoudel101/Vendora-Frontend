<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <Navbar />
    <div class="flex flex-1 h-0">
      <Sidebar />
      <main class="flex-1 flex items-center justify-center px-6 py-12">
        <div class="w-full max-w-6xl mx-auto">
          <div class="mb-12 text-center">
            <h2 class="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 dashboard-title">
              Dashboard
            </h2>
            <p class="text-gray-700 text-2xl md:text-3xl font-medium dashboard-welcome">
              Welcome, <span class="font-semibold text-blue-600">{{ auth.user?.username }}</span>!
            </p>
          </div>
          <!-- Summary grid: show only allowed cards for staff -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 summary-grid">
            <div
              v-for="card in visibleSummaryCards"
              :key="card.key"
              class="flex flex-col items-center py-6 px-2 summary-item"
            >
              <div class="flex items-center gap-3 mb-4">
                <span :class="['summary-dot', card.dotClass]"></span>
                <h3 :class="['summary-title', card.titleClass]">{{ card.title }}</h3>
              </div>
              <div :class="['summary-value', card.valueClass, { profit: card.key === 'profit', stocks: card.key === 'stocks' }]">
                {{ card.prefix }}{{ card.value.toLocaleString() }}
              </div>
              <div v-if="card.extra" class="mt-3 text-lg text-gray-500">
                {{ card.extra }}
              </div>
            </div>
          </div>
          <template v-if="auth.user">
            <div
              :class="[
                auth.user?.role === 'staff'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8'
                  : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full mb-8'
              ]"
            >
              <div
                v-for="chart in visibleChartCards"
                :key="chart.key"
                :class="[
                  'flex flex-col items-center bg-white rounded-xl border border-indigo-100 shadow-sm p-6 transition duration-200 hover:shadow-lg',
                  chart.key === 'product-stock' && auth.user?.role === 'staff'
                    ? 'min-h-[220px] max-w-md mx-auto border-2 border-purple-300 bg-violet-50'
                    : 'min-h-[220px] max-w-md mx-auto'
                ]"
              >
                <div class="flex items-center gap-3 mb-6">
                  <span
                    :class="[
                      'inline-block w-5 h-5 rounded-full shadow',
                      chart.key === 'product-stock' && auth.user?.role === 'staff'
                        ? 'bg-purple-400'
                        : chart.dotClass
                    ]"
                  ></span>
                  <h3
                    :class="[
                      'font-bold mb-2',
                      chart.key === 'product-stock' && auth.user?.role === 'staff'
                        ? 'text-2xl text-purple-700'
                        : 'text-xl text-gray-700'
                    ]"
                  >
                    {{ chart.title }}
                  </h3>
                </div>
                <component
                  :is="chart.component"
                  v-bind="chart.props"
                />
              </div>
            </div>
          </template>
          <template v-else>
            <div class="flex justify-center items-center h-64">
              <p class="text-gray-700 text-2xl animate-pulse loading">Loading user info...</p>
            </div>
          </template>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import {  DashboardStats,fetchDashboardStats } from "@/stores/dashbaordAPI";
import BarChart from "@/components/BarChart.vue";
import PieChart from "@/components/PieChart.vue";

const auth = useAuthStore();
const router = useRouter();

const dashboardStats = ref<DashboardStats | null>(null);

onMounted(async () => {
  if (!auth.token) {
    router.push({ name: "Login" });
    return;
  }
  if (!auth.user) {
    await auth.self();
  }
  try {
    dashboardStats.value = await fetchDashboardStats();
  } catch (e) {
    dashboardStats.value = {
      total_sales: 0,
      total_profit: 0,
      total_stocks: 0,
      products: [],
    };
  }
});

const summaryCards = computed(() => [
  {
    key: "sales",
    title: "Total Sales",
    value: dashboardStats.value?.total_sales ?? 0,
    prefix: "Rs. ",
    dotClass: "inline-block w-3 h-3 rounded-full bg-blue-400",
    titleClass: "text-base font-semibold text-gray-700",
    valueClass: "text-xl font-bold text-blue-700",
    extra: "",
  },
  {
    key: "profit",
    title: "Total Profit",
    value: dashboardStats.value?.total_profit ?? 0,
    prefix: "Rs. ",
    dotClass: "inline-block w-3 h-3 rounded-full bg-green-400",
    titleClass: "text-base font-semibold text-gray-700",
    valueClass: "text-xl font-bold text-green-700",
    extra: "",
  },
  {
    key: "stocks",
    title: "Total Product Stocks",
    value: dashboardStats.value?.total_stocks ?? 0,
    prefix: "",
    dotClass: "inline-block w-3 h-3 rounded-full bg-purple-400",
    titleClass: "text-base font-semibold text-gray-700",
    valueClass: "text-xl font-bold text-purple-700",
    extra: "",
  },
]);

const chartCards = computed(() => [
  {
    key: "summary",
    title: "Summary",
    dotClass: "inline-block w-3 h-3 rounded-full bg-blue-400",
    titleClass: "text-lg font-bold text-gray-700",
    component: BarChart,
    props: {
      labels: ["Total Sales", "Total Profit", "Total Stocks"],
      data: [
        dashboardStats.value?.total_sales ?? 0,
        dashboardStats.value?.total_profit ?? 0,
        dashboardStats.value?.total_stocks ?? 0,
      ],
    },
  },
  {
    key: "product-stock",
    title: "Product-wise Stock",
    dotClass: "inline-block w-3 h-3 rounded-full bg-green-400",
    titleClass: "text-lg font-bold text-gray-700",
    // Use BarChart for staff, PieChart for others
    component: auth.user?.role === "staff" ? BarChart : PieChart,
    props: {
      labels: dashboardStats.value?.products?.map(p => p.product_name) ?? [],
      data: dashboardStats.value?.products?.map(p => p.stock) ?? [],
    },
  },
]);

// Only show allowed cards/charts for staff
const visibleSummaryCards = computed(() => {
  if (auth.user?.role === "staff") {
    // Only show total product stocks
    return summaryCards.value.filter(card => card.key === "stocks");
  }
  // Show all for admin/superuser
  return summaryCards.value;
});

const visibleChartCards = computed(() => {
  if (auth.user?.role === "staff") {
    // Only show product-wise stock chart
    return chartCards.value.filter(chart => chart.key === "product-stock");
  }
  // Show all for admin/superuser
  return chartCards.value;
});
</script>

<style scoped>
.dashboard-title {
  font-weight: 800;
  color: #1e40af;
  margin-bottom: 1rem;
  letter-spacing: 1px;
}
.dashboard-welcome {
  color: #334155;
  font-size: 2rem;
}
.summary-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  margin-bottom: 3rem;
}
@media (min-width: 768px) {
  .summary-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
.summary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0.5rem;
  background: #fff;
  border-radius: 1rem;
  border: 1.5px solid #dbeafe;
  box-shadow: 0 4px 24px rgba(59, 130, 246, 0.08);
  transition: box-shadow 0.2s, transform 0.2s;
}
.summary-item:hover {
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.15);
  transform: translateY(-4px) scale(1.03);
}
.summary-dot {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  margin-right: 0.25rem;
  box-shadow: 0 2px 8px rgba(59,130,246,0.12);
}
.inline-block.bg-blue-400 { background: #2563eb; }
.inline-block.bg-green-400 { background: #22c55e; }
.inline-block.bg-purple-400 { background: #a78bfa; }
.summary-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #334155;
}
.summary-value {
  font-size: 2.5rem;
  font-weight: 800;
  margin-top: 0.5rem;
  color: #2563eb;
  letter-spacing: 1px;
}
.summary-value.profit {
  color: #16a34a;
}
.summary-value.stocks {
  color: #7c3aed;
}
.loading {
  color: #334155;
  font-size: 2rem;
  animation: pulse 1s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>