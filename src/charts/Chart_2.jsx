import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";

export default function Chart_2() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr"],
      datasets: [
        {
          label: "Sales",
          data: [10, 20, 15, 30],
          borderColor: "rgba(16, 48, 116, 0.96)",
          backgroundColor: "rgba(7, 7, 114, 0.46)",
          tension: 0.4,
        },
      ],
    };

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        responsive: true,
        onClick: (event) => {
          const chart = chartRef.current;

          // get click position
          const pos = getRelativePosition(event, chart);

          // convert click pixel - data values
          const dataX = chart.scales.x.getValueForPixel(pos.x);
          const dataY = chart.scales.y.getValueForPixel(pos.y);

          console.log("Clicked X value:", dataX);
          console.log("Clicked Y value:", dataY);
        },
      },
    });

    return () => {
      chartRef.current.destroy(); // destroy the chart instance when the component unmounts or before re-running the effect.
    };
  }, []);

  return (
    <div>
      <h2>Chart.js Auto Example</h2>
      <canvas ref={canvasRef} width={300} height={100}></canvas>
    </div>
  );
}
