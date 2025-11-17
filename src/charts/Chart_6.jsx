import { useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart_6() {
  const ref = useRef(null);

  useEffect(() => {
    const chart = new ChartJS(ref.current.getContext("2d"), {
      type: "pie",
      data: {
        labels: ["Apple", "Banana", "Cherry"],
        datasets: [
          {
            data: [10, 20, 30],
            backgroundColor: [
              "rgba(163, 20, 20, 0.96)",
              "rgba(230, 233, 46, 0.96)",
              "rgba(200, 115, 207, 0.96)",
            ],
          },
        ],
      },
      options: { responsive: false },
    });

    return () => chart.destroy();
  }, []);

  return <canvas ref={ref} width={600} height={600}></canvas>;
}
