<template>
  <div class="w-full">
    <div class="relative w-full h-48 md:h-64">
      <canvas ref="canvas" class="w-full h-full"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const props = defineProps<{
  labels: string[];
  data: number[];
}>();

const canvas = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

function renderChart() {
  if (!canvas.value) return;
  if (chart) chart.destroy();
  chart = new Chart(canvas.value, {
    type: "bar",
    data: {
      labels: props.labels,
      datasets: [
        {
          label: "Count",
          data: props.data,
          backgroundColor: ["#3b82f6", "#10b981", "#f59e42"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
    },
  });
}

onMounted(renderChart);
watch(() => [props.labels, props.data], renderChart);
</script>

<style scoped>
canvas {
  max-width: 100% !important;
  height: auto !important;
}
</style>
