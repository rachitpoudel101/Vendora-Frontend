<template>
  <div class="w-full">
    <h3 class="text-base md:text-lg font-semibold mb-2 text-gray-700">
      {{ title }}
    </h3>
    <div class="relative w-full h-48 md:h-64">
      <canvas ref="canvas" class="w-full h-full"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(PieController, ArcElement, Tooltip, Legend);

const props = defineProps<{
  labels: string[];
  data: number[];
  title?: string;
}>();

const canvas = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

function renderChart() {
  if (!canvas.value) return;
  if (chart) chart.destroy();
  chart = new Chart(canvas.value, {
    type: "pie",
    data: {
      labels: props.labels,
      datasets: [
        {
          data: props.data,
          backgroundColor: [
            "#3b82f6",
            "#10b981",
            "#f59e42",
            "#ef4444",
            "#6366f1",
            "#f43f5e",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
      },
    },
  });
}

onMounted(renderChart);
watch(() => [props.labels, props.data], renderChart);
</script>
