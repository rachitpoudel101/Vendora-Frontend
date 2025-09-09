<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-16">
    <Navbar />
    <div class="flex">
      <Sidebar />

      <!-- Main Content -->
      <main class="flex-1 ml-0 md:ml-64 h-[calc(100vh-4rem)] flex flex-col">
        <div class="p-2 sm:p-4 md:p-8 flex flex-col h-full overflow-hidden">
          <div
            class="space-y-4 sm:space-y-6 md:space-y-8 flex-1 overflow-y-auto"
          >
            <!-- Top Products Cards -->
            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
            >
              <div v-if="dashboardStats?.week_top_product" class="group">
                <div
                  class="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-emerald-50"
                >
                  <div class="flex items-center justify-between mb-3 sm:mb-4">
                    <div class="flex items-center space-x-2">
                      <div
                        class="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full"
                      ></div>
                      <h3
                        class="font-semibold text-slate-900 text-sm sm:text-base"
                      >
                        Top Product This Week
                      </h3>
                    </div>
                  </div>
                  <div class="space-y-2 sm:space-y-3">
                    <div
                      class="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-900 text-white rounded-full text-xs sm:text-sm font-medium"
                    >
                      {{ dashboardStats.week_top_product.product_name }}
                    </div>
                    <div class="flex justify-between text-xs sm:text-sm">
                      <span class="text-emerald-600 font-medium">
                        Sold:
                        {{ dashboardStats.week_top_product.sold_quantity }}
                      </span>
                      <span class="text-slate-600">
                        Stock: {{ dashboardStats.week_top_product.stock }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="dashboardStats?.month_top_product" class="group">
                <div
                  class="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-emerald-50"
                >
                  <div class="flex items-center justify-between mb-3 sm:mb-4">
                    <div class="flex items-center space-x-2">
                      <div
                        class="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full"
                      ></div>
                      <h3
                        class="font-semibold text-slate-900 text-sm sm:text-base"
                      >
                        Top Product This Month
                      </h3>
                    </div>
                  </div>
                  <div class="space-y-2 sm:space-y-3">
                    <div
                      class="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-900 text-white rounded-full text-xs sm:text-sm font-medium"
                    >
                      {{ dashboardStats.month_top_product.product_name }}
                    </div>
                    <div class="flex justify-between text-xs sm:text-sm">
                      <span class="text-emerald-600 font-medium">
                        Sold:
                        {{ dashboardStats.month_top_product.sold_quantity }}
                      </span>
                      <span class="text-slate-600">
                        Stock: {{ dashboardStats.month_top_product.stock }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="dashboardStats?.year_top_product" class="group">
                <div
                  class="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-emerald-50"
                >
                  <div class="flex items-center justify-between mb-3 sm:mb-4">
                    <div class="flex items-center space-x-2">
                      <div
                        class="w-2 h-2 sm:w-3 sm:h-3 bg-violet-500 rounded-full"
                      ></div>
                      <h3
                        class="font-semibold text-slate-900 text-sm sm:text-base"
                      >
                        Top Product This Year
                      </h3>
                    </div>
                  </div>
                  <div class="space-y-2 sm:space-y-3">
                    <div
                      class="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-900 text-white rounded-full text-xs sm:text-sm font-medium"
                    >
                      {{ dashboardStats.year_top_product.product_name }}
                    </div>
                    <div class="flex justify-between text-xs sm:text-sm">
                      <span class="text-emerald-600 font-medium">
                        Sold:
                        {{ dashboardStats.year_top_product.sold_quantity }}
                      </span>
                      <span class="text-slate-600">
                        Stock: {{ dashboardStats.year_top_product.stock }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Analytics Section -->
            <div
              class="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            >
              <div v-if="canViewPerformanceAnalytics" class="xl:col-span-3">
                <div
                  class="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm bg-gradient-to-br from-white to-blue-50"
                >
                  <div
                    class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3"
                  >
                    <h2 class="text-lg sm:text-xl font-bold text-slate-900">
                      Performance Analytics
                    </h2>
                    <div class="flex space-x-2">
                      <button
                        class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200"
                        :class="
                          selectedGraphPeriod === 'weekly'
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        "
                        @click="selectedGraphPeriod = 'weekly'"
                      >
                        Weekly
                      </button>
                      <button
                        class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200"
                        :class="
                          selectedGraphPeriod === 'yearly'
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        "
                        @click="selectedGraphPeriod = 'yearly'"
                      >
                        Yearly
                      </button>
                    </div>
                  </div>
                  <div class="flex flex-wrap gap-6 mb-4">
                    <div
                      v-if="selectedGraphPeriod === 'weekly'"
                      class="flex items-center space-x-4"
                    >
                      <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span class="text-sm font-medium text-slate-700"
                          >Weekly Profit</span
                        >
                      </div>
                      <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-sm font-medium text-slate-700"
                          >Weekly Sales</span
                        >
                      </div>
                    </div>
                    <div v-else class="flex items-center space-x-4">
                      <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 rounded-full bg-violet-500"></div>
                        <span class="text-sm font-medium text-slate-700"
                          >Yearly Profit</span
                        >
                      </div>
                      <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-sm font-medium text-slate-700"
                          >Yearly Sales</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4 mb-6">
                    <template v-if="selectedGraphPeriod === 'weekly'">
                      <div class="bg-emerald-50 rounded-xl p-4">
                        <div class="text-sm text-emerald-600 font-medium">
                          Total Weekly Profit
                        </div>
                        <div class="text-2xl font-bold text-emerald-700">
                          {{ Math.round(weeklyProfitTotal).toLocaleString() }}
                        </div>
                      </div>
                      <div class="bg-blue-50 rounded-xl p-4">
                        <div class="text-sm text-blue-600 font-medium">
                          Total Weekly Sales
                        </div>
                        <div class="text-2xl font-bold text-blue-700">
                          {{ Math.round(weeklySalesTotal).toLocaleString() }}
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <div class="bg-violet-50 rounded-xl p-4">
                        <div class="text-sm text-violet-600 font-medium">
                          Total Yearly Profit
                        </div>
                        <div class="text-2xl font-bold text-violet-700">
                          {{ Math.round(yearlyProfitTotal).toLocaleString() }}
                        </div>
                      </div>
                      <div class="bg-orange-50 rounded-xl p-4">
                        <div class="text-sm text-orange-600 font-medium">
                          Total Yearly Sales
                        </div>
                        <div class="text-2xl font-bold text-orange-700">
                          {{ Math.round(yearlySalesTotal).toLocaleString() }}
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="h-48 sm:h-64 md:h-80">
                    <Line
                      v-if="profitSalesChartData"
                      :data="profitSalesChartData"
                      :options="chartOptions"
                    />
                  </div>
                </div>
              </div>

              <!-- Pie Charts -->
              <div
                class="space-y-4 sm:space-y-6"
                :class="{ 'xl:col-span-4': !canViewPerformanceAnalytics }"
              >
                <div
                  class="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm bg-gradient-to-br from-white to-purple-50"
                >
                  <h3
                    class="font-bold text-slate-900 text-base sm:text-lg mb-3 sm:mb-4 text-center"
                  >
                    Products Sold
                  </h3>
                  <div class="h-40 sm:h-48 flex items-center justify-center">
                    <Pie
                      v-if="productsSoldChartData"
                      :data="productsSoldChartData"
                      :options="pieChartOptions"
                    />
                  </div>
                </div>

                <div
                  class="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm bg-gradient-to-br from-white to-purple-50"
                >
                  <h3
                    class="font-bold text-slate-900 text-base sm:text-lg mb-3 sm:mb-4 text-center"
                  >
                    Stock Levels
                  </h3>
                  <div class="h-40 sm:h-48 flex items-center justify-center">
                    <Pie
                      v-if="productsStockChartData"
                      :data="productsStockChartData"
                      :options="pieChartOptions"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import { useDashboardStore } from "@/stores/dashbaordAPI";
import { Line, Pie } from "vue-chartjs";
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

Chart.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
);

export type DashboardStats = {
  total_sales: number;
  total_profit: number;
  total_stocks: number;
  products: { product_name: string; stock: number; sold: number }[];
  profit_daily?: number;
  sales_daily?: number;
  profit_weekly?: number;
  sales_weekly?: number;
  profit_monthly?: number;
  sales_monthly?: number;
  profit_yearly?: number;
  sales_yearly?: number;
  weekly_profit_by_day?: { weekday: string; profit: number }[];
  monthly_profit_by_date?: { date: string; profit: number }[];
  yearly_profit_by_month?: { month: string; profit: number }[];
  weekly_sales_by_day?: { weekday: string; sales: number }[];
  monthly_sales_by_date?: { date: string; sales: number }[];
  yearly_sales_by_month?: { month: string; sales: number }[];
  week_top_product?: {
    product_name: string;
    sold_quantity: number;
    stock: number;
  } | null;
  month_top_product?: {
    product_name: string;
    sold_quantity: number;
    stock: number;
  } | null;
  year_top_product?: {
    product_name: string;
    sold_quantity: number;
    stock: number;
  } | null;
};

const auth = useAuthStore();
const dashboardStore = useDashboardStore();
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
    dashboardStats.value = await dashboardStore.fetchDashboardStats();
  } catch (e) {
    dashboardStats.value = {
      total_sales: 0,
      total_profit: 0,
      total_stocks: 0,
      products: [],
    };
  }
});

const selectedGraphPeriod = ref<"weekly" | "yearly">("weekly");

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: {
      backgroundColor: "rgba(15, 23, 42, 0.9)",
      titleColor: "#f8fafc",
      bodyColor: "#f8fafc",
      borderColor: "rgba(148, 163, 184, 0.2)",
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      titleFont: { size: 14, weight: 600 },
      bodyFont: { size: 13 },
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
        color: "rgba(148, 163, 184, 0.1)",
        lineWidth: 1,
      },
      ticks: {
        font: { size: 12 },
        color: "#64748b",
      },
      border: { display: false },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: "rgba(148, 163, 184, 0.1)",
        lineWidth: 1,
      },
      ticks: {
        font: { size: 12 },
        color: "#64748b",
        callback: function (value: any) {
          return " " + value.toLocaleString();
        },
      },
      border: { display: false },
    },
  },
  elements: {
    line: {
      borderWidth: 3,
      tension: 0.4,
    },
    point: {
      radius: 4,
      hoverRadius: 6,
      borderWidth: 2,
      backgroundColor: "#ffffff",
    },
  },
};

const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "bottom" as const,
      labels: {
        font: { size: 11, weight: 500 },
        color: "#475569",
        boxWidth: 12,
        padding: 15,
        usePointStyle: true,
        pointStyle: "circle",
      },
    },
    tooltip: {
      backgroundColor: "rgba(15, 23, 42, 0.9)",
      titleColor: "#f8fafc",
      bodyColor: "#f8fafc",
      borderColor: "rgba(148, 163, 184, 0.2)",
      borderWidth: 1,
      cornerRadius: 8,
      titleFont: { size: 13, weight: 600 },
      bodyFont: { size: 12 },
    },
  },
};

const profitSalesChartData = computed(() => {
  const datasets = [];
  let labels: string[] = [];

  if (selectedGraphPeriod.value === "weekly") {
    if (dashboardStats.value?.weekly_profit_by_day) {
      labels = dashboardStats.value.weekly_profit_by_day.map((d) => d.weekday);
      datasets.push({
        label: "Weekly Profit",
        data: dashboardStats.value.weekly_profit_by_day.map((d) => d.profit),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
      });
    }
    if (dashboardStats.value?.weekly_sales_by_day) {
      if (labels.length === 0) {
        labels = dashboardStats.value.weekly_sales_by_day.map((d) => d.weekday);
      }
      datasets.push({
        label: "Weekly Sales",
        data: dashboardStats.value.weekly_sales_by_day.map((d) => d.sales),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      });
    }
  } else if (selectedGraphPeriod.value === "yearly") {
    if (dashboardStats.value?.yearly_profit_by_month) {
      labels = dashboardStats.value.yearly_profit_by_month.map((d) => d.month);
      datasets.push({
        label: "Yearly Profit",
        data: dashboardStats.value.yearly_profit_by_month.map((d) => d.profit),
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        fill: true,
        tension: 0.4,
      });
    }
    if (dashboardStats.value?.yearly_sales_by_month) {
      if (labels.length === 0) {
        labels = dashboardStats.value.yearly_sales_by_month.map((d) => d.month);
      }
      datasets.push({
        label: "Yearly Sales",
        data: dashboardStats.value.yearly_sales_by_month.map((d) => d.sales),
        borderColor: "#f97316",
        backgroundColor: "rgba(249, 115, 22, 0.1)",
        fill: true,
        tension: 0.4,
      });
    }
  }

  if (datasets.length === 0) return null;
  return { labels, datasets };
});

const productsSoldChartData = computed(() => {
  if (!dashboardStats.value?.products) return null;

  const products = dashboardStats.value.products.slice(0, 5);
  const labels = products.map((p) => p.product_name);
  const data = products.map((p) => p.sold);

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
        borderWidth: 0,
        hoverBorderWidth: 2,
        hoverBorderColor: "#ffffff",
      },
    ],
  };
});

const productsStockChartData = computed(() => {
  if (!dashboardStats.value?.products) return null;

  const products = dashboardStats.value.products.slice(0, 5);
  const labels = products.map((p) => p.product_name);
  const data = products.map((p) => p.stock);

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          "#06b6d4",
          "#84cc16",
          "#f97316",
          "#ec4899",
          "#6366f1",
        ],
        borderWidth: 0,
        hoverBorderWidth: 2,
        hoverBorderColor: "#ffffff",
      },
    ],
  };
});

const weeklyProfitTotal = computed(() =>
  dashboardStats.value?.weekly_profit_by_day
    ? dashboardStats.value.weekly_profit_by_day.reduce(
        (sum, d) => sum + Number(d.profit),
        0,
      )
    : 0,
);

const weeklySalesTotal = computed(() =>
  dashboardStats.value?.weekly_sales_by_day
    ? dashboardStats.value.weekly_sales_by_day.reduce(
        (sum, d) => sum + Number(d.sales),
        0,
      )
    : 0,
);

const yearlyProfitTotal = computed(() =>
  dashboardStats.value?.yearly_profit_by_month
    ? dashboardStats.value.yearly_profit_by_month.reduce(
        (sum, d) => sum + Number(d.profit),
        0,
      )
    : 0,
);

const yearlySalesTotal = computed(() =>
  dashboardStats.value?.yearly_sales_by_month
    ? dashboardStats.value.yearly_sales_by_month.reduce(
        (sum, d) => sum + Number(d.sales),
        0,
      )
    : 0,
);

// Add role checking computed property
const canViewPerformanceAnalytics = computed(() => {
  return auth.user?.role === "admin" || auth.user?.role === "superadmin";
});
</script>

<style scoped>
/* Unified scrollbar for dashboard */
.overflow-y-auto::-webkit-scrollbar,
.overflow-auto::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track,
.overflow-auto::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb,
.overflow-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  border-radius: 4px;
  border: 1px solid #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover,
.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #cbd5e1, #94a3b8);
}

/* Enhanced mobile responsiveness */
@media (max-width: 767px) {
  main {
    margin-left: 0;
  }
}

@media (max-width: 640px) {
  .h-\[calc\(100vh-4rem\)\] {
    height: calc(100vh - 5rem);
  }
}
</style>
