import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Chart_3() {
  const ref = useRef(null);

  useEffect(() => {
    const labels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
    ];
    const ctx = ref.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Votes",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
              "rgba(184, 11, 49, 0.4)",
              "rgba(160, 134, 20, 0.42)",
              "rgba(71, 143, 12, 0.42)",
              "rgba(5, 132, 136, 0.49)",
              "rgba(2, 6, 59, 0.47)",
              "rgba(99, 71, 153, 0.46)",
              "rgba(67, 67, 68, 0.39)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgba(255, 220, 64, 1)",
              "rgba(162, 255, 86, 1)",
              "rgba(75, 188, 192, 1)",
              "rgba(54, 66, 235, 1)",
              "rgba(111, 67, 201, 1)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return <canvas ref={ref} width={300} height={100}></canvas>;
}
