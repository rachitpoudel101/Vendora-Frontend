<template>
  <div class="w-full">
    <h3 class="text-base md:text-lg font-semibold mb-2 text-gray-700">
      {{ title }}
    </h3>
    <div class="relative w-full h-72 md:h-96">
      <canvas ref="canvas" class="w-full h-full"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
);

const props = defineProps<{
  labels: string[];
  data: number[];
  data2?: number[];
  title?: string;
}>();

const canvas = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

function renderChart() {
  if (!canvas.value) return;
  if (chart) chart.destroy();
  chart = new Chart(canvas.value, {
    type: "line",
    data: {
      labels: props.labels,
      datasets: [
        {
          label: "Profit",
          data: props.data,
          borderColor: "#16a34a",
          backgroundColor: "rgba(22, 163, 74, 0.1)",
          pointBackgroundColor: "#16a34a",
          pointBorderColor: "#16a34a",
          fill: false,
          tension: 0.3,
        },
        ...(props.data2
          ? [
              {
                label: "Sales",
                data: props.data2,
                borderColor: "#2563eb",
                backgroundColor: "rgba(37, 99, 235, 0.1)",
                pointBackgroundColor: "#2563eb",
                pointBorderColor: "#2563eb",
                fill: false,
                tension: 0.3,
              },
            ]
          : []),
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true, position: "top" },
        tooltip: {},
      },
      scales: {
        x: { display: true, title: { display: false } },
        y: { display: true, title: { display: false }, beginAtZero: true },
      },
    },
  });
}

onMounted(renderChart);
watch(() => [props.labels, props.data, props.data2], renderChart);
</script>

<style scoped>
canvas {
  max-width: 100% !important;
  height: 100% !important;
  min-height: 18rem !important;
}
</style>
