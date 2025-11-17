import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Chart_10() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = ref.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            type: "bar",
            label: "Sales (Bar)",
            data: [30, 50, 40, 60, 70],
            backgroundColor: "rgba(75, 192, 192, 0.5)",
          },
          {
            type: "line",
            label: "Trend (Line)",
            data: [20, 45, 35, 55, 65],
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
            fill: false,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return <canvas ref={ref} width={900} height={550}></canvas>;
}
