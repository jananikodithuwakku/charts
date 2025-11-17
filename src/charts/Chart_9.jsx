import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Chart_9() {
  const ref = useRef(null);

  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: "bubble",
      data: {
        datasets: [
          {
            label: "Bubbles",
            data: [
              { x: 20, y: 30, r: 15 },
              { x: 40, y: 10, r: 10 },
              { x: 30, y: 15, r: 5 },
              { x: 10, y: 18, r: 12 },
            ],
            backgroundColor: "purple",
          },
        ],
      },
    });

    return () => chart.destroy();
  }, []);

  return <canvas ref={ref} width={300} height={100}></canvas>;
}
