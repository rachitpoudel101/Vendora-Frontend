<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <div class="fixed top-0 left-0 right-0 z-50">
      <Navbar />
    </div>
    <div class="flex flex-1 h-screen pt-16">
      <div class="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 z-40">
        <Sidebar />
      </div>
      <main
        class="flex-1 md:ml-64 px-2 md:px-6 py-4 md:py-12 overflow-auto"
        style="height: calc(100vh - 4rem)"
      >
        <div class="w-full max-w-4xl mx-auto">
          <!-- Top-selling products switchable card (responsive) -->
          <div class="w-full mb-6 md:mb-8">
            <div
              class="flex flex-col items-center bg-white rounded-xl border border-indigo-100 shadow-sm p-4 md:p-6 transition duration-200 hover:shadow-lg min-h-[140px] md:min-h-[180px] max-w-full md:max-w-md mx-auto"
            >
              <div class="flex gap-2 mb-4 flex-wrap justify-center">
                <button
                  v-for="period in topProductPeriods"
                  :key="period.key"
                  @click="
                    selectedTopProductPeriod = period.key as
                      | 'week'
                      | 'month'
                      | 'year'
                  "
                  :class="[
                    'px-3 py-1 rounded font-semibold border text-sm md:text-base',
                    selectedTopProductPeriod === period.key
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-indigo-50',
                  ]"
                >
                  {{ period.label }}
                </button>
              </div>
              <div
                v-if="
                  selectedTopProductPeriod === 'week' &&
                  dashboardStats?.week_top_product
                "
                class="flex flex-col items-center"
              >
                <h4 class="font-bold text-base md:text-lg text-indigo-700 mb-2">
                  Top Product This Week
                </h4>
                <div class="text-gray-700 text-sm md:text-base mb-1">
                  {{ dashboardStats.week_top_product.product_name }}
                </div>
                <div class="text-green-600 text-xs md:text-sm">
                  Sold: {{ dashboardStats.week_top_product.sold_quantity }}
                </div>
                <div class="text-purple-600 text-xs md:text-sm">
                  Stock: {{ dashboardStats.week_top_product.stock }}
                </div>
              </div>
              <div
                v-if="
                  selectedTopProductPeriod === 'month' &&
                  dashboardStats?.month_top_product
                "
                class="flex flex-col items-center"
              >
                <h4 class="font-bold text-base md:text-lg text-indigo-700 mb-2">
                  Top Product This Month
                </h4>
                <div class="text-gray-700 text-sm md:text-base mb-1">
                  {{ dashboardStats.month_top_product.product_name }}
                </div>
                <div class="text-green-600 text-xs md:text-sm">
                  Sold: {{ dashboardStats.month_top_product.sold_quantity }}
                </div>
                <div class="text-purple-600 text-xs md:text-sm">
                  Stock: {{ dashboardStats.month_top_product.stock }}
                </div>
              </div>
              <div
                v-if="
                  selectedTopProductPeriod === 'year' &&
                  dashboardStats?.year_top_product
                "
                class="flex flex-col items-center"
              >
                <h4 class="font-bold text-base md:text-lg text-indigo-700 mb-2">
                  Top Product This Year
                </h4>
                <div class="text-gray-700 text-sm md:text-base mb-1">
                  {{ dashboardStats.year_top_product.product_name }}
                </div>
                <div class="text-green-600 text-xs md:text-sm">
                  Sold: {{ dashboardStats.year_top_product.sold_quantity }}
                </div>
                <div class="text-purple-600 text-xs md:text-sm">
                  Stock: {{ dashboardStats.year_top_product.stock }}
                </div>
              </div>
              <div
                v-if="!dashboardStats || !topProductAvailable"
                class="text-gray-400 text-base mt-4"
              >
                No data available.
              </div>
            </div>
          </div>
          <!-- Profit & Sales line chart (full width, above pie charts) -->
          <div v-if="auth.user?.role !== 'staff'" class="w-full mb-8">
            <div
              class="flex flex-col items-center bg-white rounded-xl border border-indigo-100 shadow-sm p-6 transition duration-200 hover:shadow-lg min-h-[220px]"
            >
              <div class="flex items-center gap-3 mb-6 w-full justify-between">
                <div class="flex items-center gap-3">
                  <span
                    class="inline-block w-5 h-5 rounded-full shadow bg-green-400"
                  ></span>
                  <h3 class="font-bold mb-2 text-xl text-gray-700">
                    {{ profitChartTitle }}
                  </h3>
                </div>
                <div class="flex gap-4 items-center">
                  <div
                    v-if="selectedProfitPeriod === 'daily'"
                    class="text-sm md:text-base font-semibold text-green-600"
                  >
                    Profit: Rs.
                    {{
                      dashboardStats?.profit_daily?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      }) ?? "0.00"
                    }}
                  </div>
                  <div
                    v-if="selectedProfitPeriod === 'daily'"
                    class="text-sm md:text-base font-semibold text-blue-600"
                  >
                    Sales:
                    {{
                      dashboardStats?.sales_daily?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      }) ?? "0.00"
                    }}
                  </div>
                  <div
                    v-if="selectedProfitPeriod === 'weekly'"
                    class="text-sm md:text-base font-semibold text-green-600"
                  >
                    Profit: Rs.
                    {{
                      dashboardStats?.profit_weekly?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      }) ?? "0.00"
                    }}
                  </div>
                  <div
                    v-if="selectedProfitPeriod === 'weekly'"
                    class="text-sm md:text-base font-semibold text-blue-600"
                  >
                    Sales:
                    {{
                      dashboardStats?.sales_weekly?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      }) ?? "0.00"
                    }}
                  </div>
                  <div
                    v-if="selectedProfitPeriod === 'monthly'"
                    class="text-sm md:text-base font-semibold text-green-600"
                  >
                    Profit: Rs.
                    {{
                      dashboardStats?.profit_monthly?.toLocaleString(
                        undefined,
                        { minimumFractionDigits: 2 },
                      ) ?? "0.00"
                    }}
                  </div>
                  <div
                    v-if="selectedProfitPeriod === 'monthly'"
                    class="text-sm md:text-base font-semibold text-blue-600"
                  >
                    Sales:
                    {{
                      dashboardStats?.sales_monthly?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      }) ?? "0.00"
                    }}
                  </div>
                  <div
                    v-if="selectedProfitPeriod === 'yearly'"
                    class="text-sm md:text-base font-semibold text-green-600"
                  >
                    Profit: Rs.
                    {{
                      dashboardStats?.profit_yearly?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      }) ?? "0.00"
                    }}
                  </div>
                  <div
                    v-if="selectedProfitPeriod === 'yearly'"
                    class="text-sm md:text-base font-semibold text-blue-600"
                  >
                    Sales:
                    {{
                      dashboardStats?.sales_yearly?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      }) ?? "0.00"
                    }}
                  </div>
                </div>
              </div>
              <div class="flex gap-2 mb-4">
                <button
                  v-for="period in profitPeriods"
                  :key="period.key"
                  @click="
                    selectedProfitPeriod = period.key as
                      | 'daily'
                      | 'weekly'
                      | 'monthly'
                      | 'yearly'
                  "
                  :class="[
                    'px-4 py-1 rounded font-semibold border',
                    selectedProfitPeriod === period.key
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-indigo-50',
                  ]"
                >
                  {{ period.label }}
                </button>
              </div>
              <LineChart
                :labels="profitChartLabels"
                :data="profitChartData"
                :data2="salesChartData"
                :title="profitChartTitle"
              />
            </div>
          </div>
          <template v-if="auth.user">
            <div
              :class="[
                auth.user?.role === 'staff'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8'
                  : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full mb-8',
              ]"
            >
              <div
                v-for="chart in visibleChartCards"
                :key="chart.key"
                :class="[
                  'flex flex-col items-center bg-white rounded-xl border border-indigo-100 shadow-sm p-6 transition duration-200 hover:shadow-lg',
                  chart.key === 'product-stock' && auth.user?.role === 'staff'
                    ? 'min-h-[220px] max-w-md mx-auto border-2 border-purple-300 bg-violet-50'
                    : 'min-h-[220px] max-w-md mx-auto',
                ]"
              >
                <div class="flex items-center gap-3 mb-6">
                  <span
                    :class="[
                      'inline-block w-5 h-5 rounded-full shadow',
                      chart.key === 'product-stock' &&
                      auth.user?.role === 'staff'
                        ? 'bg-purple-400'
                        : chart.dotClass,
                    ]"
                  ></span>
                  <h3
                    :class="[
                      'font-bold mb-2',
                      chart.key === 'product-stock' &&
                      auth.user?.role === 'staff'
                        ? 'text-2xl text-purple-700'
                        : 'text-xl text-gray-700',
                    ]"
                  >
                    {{ chart.title }}
                  </h3>
                </div>
                <component :is="chart.component" v-bind="chart.props" />
              </div>
            </div>
          </template>
          <template v-else>
            <div class="flex justify-center items-center h-64">
              <p class="text-gray-700 text-2xl animate-pulse loading">
                Loading user info...
              </p>
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
import { fetchDashboardStats } from "@/stores/dashbaordAPI";
import PieChart from "@/components/PieChart.vue";
import LineChart from "@/components/LineChart.vue";

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

const chartCards = computed(() => [
  {
    key: "product-stock",
    title: "Product-wise Stock",
    dotClass: "inline-block w-3 h-3 rounded-full bg-green-400",
    titleClass: "text-lg font-bold text-gray-700",
    component: PieChart,
    props: {
      labels: dashboardStats.value?.products?.map((p) => p.product_name) ?? [],
      data: dashboardStats.value?.products?.map((p) => p.stock) ?? [],
      // title: "Product-wise Stock",
    },
  },
  {
    key: "product-sold",
    title: "Product-wise Sold",
    dotClass: "inline-block w-3 h-3 rounded-full bg-blue-400",
    titleClass: "text-lg font-bold text-gray-700",
    component: PieChart,
    props: {
      labels: dashboardStats.value?.products?.map((p) => p.product_name) ?? [],
      data: dashboardStats.value?.products?.map((p) => p.sold ?? 0) ?? [],
      // title: "Product-wise Sold",
    },
  },
]);

const visibleChartCards = computed(() => {
  if (auth.user?.role === "staff") {
    // Show both product-wise stock and sold chart for staff
    return chartCards.value.filter(
      (chart) => chart.key === "product-stock" || chart.key === "product-sold",
    );
  }
  // Show all for admin/superuser
  return chartCards.value;
});

const selectedProfitPeriod = ref<"daily" | "weekly" | "monthly" | "yearly">(
  "daily",
);
const profitPeriods = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "yearly", label: "Yearly" },
];

const profitChartTitle = computed(() => {
  if (selectedProfitPeriod.value === "weekly")
    return "Weekly Profit & Sales by Day";
  if (selectedProfitPeriod.value === "daily") return "Daily Profit & Sales";
  if (selectedProfitPeriod.value === "monthly") return "Monthly Profit & Sales";
  if (selectedProfitPeriod.value === "yearly") return "Yearly Profit & Sales";
  return "";
});

function formatDateLabel(dateStr: string) {
  // Converts "2024-08-01" to "Aug 1"
  const dateObj = new Date(dateStr);
  if (isNaN(dateObj.getTime())) return dateStr;
  return dateObj.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });
}

const profitChartLabels = computed(() => {
  if (selectedProfitPeriod.value === "weekly") {
    return (
      dashboardStats.value?.weekly_profit_by_day?.map((d) => d.weekday) ?? []
    );
  }
  if (selectedProfitPeriod.value === "monthly") {
    // Format date as "Aug 1"
    return (
      dashboardStats.value?.monthly_profit_by_date?.map((d) =>
        formatDateLabel(d.date),
      ) ?? []
    );
  }
  if (selectedProfitPeriod.value === "daily") {
    // Format date as "Aug 1"
    return (
      dashboardStats.value?.monthly_profit_by_date?.map((d) =>
        formatDateLabel(d.date),
      ) ?? []
    );
  }
  if (selectedProfitPeriod.value === "yearly") {
    return (
      dashboardStats.value?.yearly_profit_by_month?.map((d) => d.month) ?? []
    );
  }
  return [profitChartTitle.value];
});

const profitChartData = computed(() => {
  if (selectedProfitPeriod.value === "weekly") {
    return (
      dashboardStats.value?.weekly_profit_by_day?.map((d) =>
        Number(d.profit),
      ) ?? []
    );
  }
  if (selectedProfitPeriod.value === "monthly") {
    return (
      dashboardStats.value?.monthly_profit_by_date?.map((d) =>
        Number(d.profit),
      ) ?? []
    );
  }
  if (selectedProfitPeriod.value === "daily") {
    return (
      dashboardStats.value?.monthly_profit_by_date?.map((d) =>
        Number(d.profit),
      ) ?? []
    );
  }
  if (selectedProfitPeriod.value === "yearly") {
    return (
      dashboardStats.value?.yearly_profit_by_month?.map((d) =>
        Number(d.profit),
      ) ?? []
    );
  }
  return [];
});

// Add salesChartData for the second line
const salesChartData = computed(() => {
  if (selectedProfitPeriod.value === "weekly") {
    return (
      dashboardStats.value?.weekly_sales_by_day?.map((d) => Number(d.sales)) ??
      []
    );
  }
  if (selectedProfitPeriod.value === "monthly") {
    return (
      dashboardStats.value?.monthly_sales_by_date?.map((d) =>
        Number(d.sales),
      ) ?? []
    );
  }
  if (selectedProfitPeriod.value === "daily") {
    return (
      dashboardStats.value?.monthly_sales_by_date?.map((d) =>
        Number(d.sales),
      ) ?? []
    );
  }
  if (selectedProfitPeriod.value === "yearly") {
    return (
      dashboardStats.value?.yearly_sales_by_month?.map((d) =>
        Number(d.sales),
      ) ?? []
    );
  }
  return [];
});

const topProductPeriods = [
  { key: "week", label: "Week" },
  { key: "month", label: "Month" },
  { key: "year", label: "Year" },
];
const selectedTopProductPeriod = ref<"week" | "month" | "year">("week");

const topProductAvailable = computed(() => {
  if (selectedTopProductPeriod.value === "week")
    return !!dashboardStats.value?.week_top_product;
  if (selectedTopProductPeriod.value === "month")
    return !!dashboardStats.value?.month_top_product;
  if (selectedTopProductPeriod.value === "year")
    return !!dashboardStats.value?.year_top_product;
  return false;
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
  gap: 1.5rem;
  margin-bottom: 2rem;
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
  padding: 1rem 0.25rem;
  background: #fff;
  border-radius: 0.75rem;
  border: 1px solid #dbeafe;
  box-shadow: 0 2px 12px rgba(59, 130, 246, 0.06);
  transition:
    box-shadow 0.2s,
    transform 0.2s;
}
.summary-item:hover {
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.1);
  transform: translateY(-2px) scale(1.02);
}
.summary-dot {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
  margin-right: 0.15rem;
  box-shadow: 0 1px 4px rgba(59, 130, 246, 0.1);
}
.inline-block.bg-blue-400 {
  background: #2563eb;
}
.inline-block.bg-green-400 {
  background: #22c55e;
}
.inline-block.bg-purple-400 {
  background: #a78bfa;
}
.summary-title {
  font-size: 1rem;
  font-weight: 600;
  color: #334155;
}
.summary-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0.25rem;
  color: #2563eb;
  letter-spacing: 0.5px;
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
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
@media (max-width: 767px) {
  .ml-64 {
    margin-left: 0 !important;
  }
  .max-w-4xl {
    max-width: 100vw !important;
  }
  .min-h-\[180px\] {
    min-height: 140px !important;
  }
  .px-6 {
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }
  .py-12 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
}
</style>
