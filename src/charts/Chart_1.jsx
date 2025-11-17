import { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getRelativePosition } from "chart.js/helpers";

// register what Chart.js needs
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend
);

export default function Chart_1() {
  const chartRef = useRef(null);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Sales",
        data: [10, 20, 15, 30],
        borderColor: "rgba(16, 48, 116, 0.96)",
        backgroundColor: "rgba(7, 7, 90, 0.3)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    onClick: (event) => {
      // get chart instance
      const chart = chartRef.current;

      if (!chart) return;

      // get click coordinates
      const pos = getRelativePosition(event, chart);

      const xValue = chart.scales.x.getValueForPixel(pos.x);
      const yValue = chart.scales.y.getValueForPixel(pos.y);

      console.log("Clicked X value:", xValue);
      console.log("Clicked Y value:", yValue);
    },
  };

  return (
    <div>
      <h2>React Chart.js Example</h2>
      <Line
        ref={chartRef}
        data={data}
        options={options}
        width={300}
        height={100}
      />
    </div>
  );
}
