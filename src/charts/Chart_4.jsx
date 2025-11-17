import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Chart_4() {
  const ref = useRef(null);

  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: "radar",
      data: {
        labels: ["Running", "Swimming", "Cycling"],
        datasets: [
          {
            label: "Fitness",
            data: [65, 59, 90],
            backgroundColor: "rgba(116, 16, 91, 0.2)",
            borderColor: "rgba(116, 16, 16, 0.96)",
          },
        ],
      },
      options: { responsive: false },
    });

    return () => chart.destroy();
  }, []);

  return <canvas ref={ref} width={800} height={800}></canvas>;
}
