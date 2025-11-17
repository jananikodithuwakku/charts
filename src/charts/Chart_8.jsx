import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Chart_8() {
  const ref = useRef(null);

  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Scatter Sample",
            data: [
              { x: -10, y: 0 },
              { x: 0, y: 10 },
              { x: 10, y: 5 },
              { x: 8, y: 3 },
              { x: 2, y: 6 },
            ],
            backgroundColor: "rgba(16, 26, 116, 0.96)",
          },
        ],
      },
    });

    return () => chart.destroy();
  }, []);

  return <canvas ref={ref} width={300} height={120}></canvas>;
}
