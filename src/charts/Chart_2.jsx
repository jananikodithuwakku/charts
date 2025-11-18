import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";

export default function Chart_2() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const [labels, setLabels] = useState(["Jan", "Feb", "Mar", "Apr"]);
  const [values, setValues] = useState([10, 20, 15, 30]);

  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");

  // Create chart once
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Sales",
            data: values,
            borderColor: "rgba(16, 48, 116, 0.96)",
            backgroundColor: "rgba(7, 7, 114, 0.46)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: false,
        onClick: (event) => {
          const chart = chartRef.current;
          const pos = getRelativePosition(event, chart);

          const dataX = chart.scales.x.getValueForPixel(pos.x);
          const dataY = chart.scales.y.getValueForPixel(pos.y);

          console.log("Clicked X:", dataX);
          console.log("Clicked Y:", dataY);
        },
      },
    });

    return () => chartRef.current.destroy();
  }, []);

  // update chart whenever labels or values change
  useEffect(() => {
    if (!chartRef.current) return;

    chartRef.current.data.labels = labels;
    chartRef.current.data.datasets[0].data = values;
    chartRef.current.update();
  }, [labels, values]);

  // add new point
  const addData = () => {
    if (!newLabel || newValue === "") return alert("Fill both fields!");

    setLabels((prev) => [...prev, newLabel]);
    setValues((prev) => [...prev, Number(newValue)]);

    setNewLabel("");
    setNewValue("");
  };

  // edit existing value
  const editValue = (index, newVal) => {
    const updated = [...values];
    updated[index] = Number(newVal);
    setValues(updated);
  };

  // delete last value
  const deleteLast = () => {
    if (labels.length <= 1) return alert("At least 1 point required!");

    setLabels(labels.slice(0, -1));
    setValues(values.slice(0, -1));
  };

  return (
    <div style={{ display: "flex", gap: "30px" }}>
      
    
      <div>
        <h2>Editable Chart.js (Auto)</h2>
        <canvas ref={canvasRef} width={600} height={300}></canvas>
      </div>

      
      <div
        style={{
          width: "280px",
          padding: "15px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h3>Add Label + Value</h3>
        <input
          type="text"
          placeholder="Label"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <input
          type="number"
          placeholder="Value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <button onClick={addData} style={{ width: "100%", marginBottom: "15px" }}>
          Add
        </button>

        <hr />

        <h3>Edit Values</h3>
        {values.map((v, i) => (
          <div key={i} style={{ marginBottom: "7px" }}>
            {labels[i]}:
            <input
              type="number"
              value={v}
              onChange={(e) => editValue(i, e.target.value)}
              style={{ width: "60px", marginLeft: "10px" }}
            />
          </div>
        ))}

        <hr />

        <button
          style={{
            width: "100%",
            background: "red",
            color: "white",
            padding: "8px",
            marginTop: "10px",
          }}
          onClick={deleteLast}
        >
          Delete Last Item
        </button>
      </div>
    </div>
  );
}
