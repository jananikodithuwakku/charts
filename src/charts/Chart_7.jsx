import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function Chart_7() {
  const ref = useRef(null);

  useEffect(() => {
    const chart = new ChartJS(ref.current.getContext("2d"), {
      type: "polarArea",
      data: {
        labels: ["A", "B", "C", "D"],
        datasets: [
          {
            data: [11, 16, 7, 3],
            backgroundColor: [
              "rgba(116, 16, 16, 0.96)",
              "rgba(16, 116, 49, 0.96)",
              "rgba(16, 43, 116, 0.96)",
              "rgba(116, 114, 16, 0.96)",
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
