import { useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart_5() {
  const ref = useRef(null);

  useEffect(() => {
    const chart = new ChartJS(ref.current.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["Red", "Green", "Blue"],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: [
              "rgba(116, 16, 21, 1)",
              "rgba(16, 116, 49, 0.93)",
              "rgba(16, 34, 116, 1)",
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
