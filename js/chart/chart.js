const themeBtn = document.getElementById("theme-toggle");
const root = document.documentElement;
const salesData = {
  6: {
    labels: ["January", "February", "March", "April", "May", "June"],
    products: [30, 34, 29, 38, 41, 45],
  },
  12: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],

    products: [26, 30, 34, 29, 38, 41, 45, 40, 47, 44, 50, 53],
  },
};

const chartCanvas = document.getElementById("sales-chart");
let salesChart = null;

function isDark() {
  return root.classList.contains("dark");
}

function chartColors() {
  return {
    grid: isDark() ? "rgba(234,251,242,0.06)" : "rgba(14,26,21,0.06)",
    tick: isDark() ? "rgba(234,251,242,0.45)" : "rgba(14,26,21,0.45)",
    tooltipBg: isDark() ? "#131b17" : "#ffffff",
    tooltipText: isDark() ? "#eafbf2" : "#0e1a15",
    tooltipBorder: isDark() ? "rgba(44,255,138,0.18)" : "rgba(0,230,118,0.18)",
  };
}

function makeGradient(ctx, area, from, to) {
  const gradient = ctx.createLinearGradient(0, area.top, 0, area.bottom);
  gradient.addColorStop(0, from);
  gradient.addColorStop(1, to);
  return gradient;
}

function buildChart(range) {
  const colors = chartColors();
  const data = salesData[range];
  const ctx = chartCanvas.getContext("2d");

  if (salesChart) salesChart.destroy();

  salesChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "products sales ",
          data: data.products,
          backgroundColor: function (c) {
            if (!c.chart.chartArea) return "rgba(0,230,118,0.6)";
            return makeGradient(
              c.chart.ctx,
              c.chart.chartArea,
              "rgba(0,230,118,0.95)",
              "rgba(0,230,118,0.25)",
            );
          },
          borderRadius: 8,
          borderSkipped: false,
          maxBarThickness: 26,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 650, easing: "easeOutQuart" },
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: colors.tooltipBg,
          titleColor: colors.tooltipText,
          bodyColor: colors.tooltipText,
          borderColor: colors.tooltipBorder,
          borderWidth: 1,
          padding: 10,
          cornerRadius: 10,
          displayColors: true,
          boxPadding: 4,
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: colors.tick, font: { size: 11 } },
        },
        y: {
          grid: { color: colors.grid },
          ticks: {
            color: colors.tick,
            font: { size: 11 },
            callback: (v) => v + "M",
          },
          border: { display: false },
        },
      },
    },
  });
}

let currentRange = 6;
buildChart(currentRange);

document.querySelectorAll(".chart-range-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    currentRange = Number(btn.dataset.range);
    document.querySelectorAll(".chart-range-btn").forEach(function (b) {
      b.classList.remove("bg-neon-500", "text-white", "shadow-neon-sm");
      b.classList.add("text-ink-light/60", "dark:text-ink-dark/60");
    });
    btn.classList.remove("text-ink-light/60", "dark:text-ink-dark/60");
    btn.classList.add("bg-neon-500", "text-white", "shadow-neon-sm");
    buildChart(currentRange);
  });
});

// Rebuild chart colors when the theme toggle changes dark/light mode
themeBtn.addEventListener("click", function () {
  setTimeout(function () {
    buildChart(currentRange);
  }, 50);
});
