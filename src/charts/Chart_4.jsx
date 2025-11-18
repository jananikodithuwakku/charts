import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export default function Chart_4() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  // chart data (editable)
  const [labels, setLabels] = useState(["Running", "Swimming", "Cycling"]);
  const [values, setValues] = useState([65, 59, 90]);

  // input fields
  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    const ctx = canvasRef.current;

    chartRef.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Fitness",
            data: values,
            backgroundColor: "rgba(116, 16, 91, 0.2)",
            borderColor: "rgba(116, 16, 16, 0.96)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          r: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => chartRef.current.destroy();
  }, []);

  // re-render chart when labels or values change
  useEffect(() => {
    if (!chartRef.current) return;

    chartRef.current.data.labels = labels;
    chartRef.current.data.datasets[0].data = values;
    chartRef.current.update();
  }, [labels, values]);

  // add new label + value
  const addData = () => {
    if (!newLabel || newValue === "") return alert("Fill both fields!");

    setLabels([...labels, newLabel]);
    setValues([...values, Number(newValue)]);

    setNewLabel("");
    setNewValue("");
  };

  // edit value
  const editValue = (index, newVal) => {
    const updated = [...values];
    updated[index] = Number(newVal);
    setValues(updated);
  };

  // delete last label/value
  const deleteLast = () => {
    if (labels.length <= 1) return alert("At least one item required!");

    setLabels(labels.slice(0, -1));
    setValues(values.slice(0, -1));
  };

  return (
    <div style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>
      <div>
        <h2>Editable Radar Chart</h2>
        <canvas ref={canvasRef} width={700} height={600}></canvas>
      </div>

      <div
        style={{
          width: "280px",
          padding: "15px",
          background: "#f3f3f3",
          borderRadius: "8px",
        }}
      >
        <h3>Add Label + Value</h3>

        <input
          type="text"
          placeholder="Activity"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="number"
          placeholder="Score"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <button onClick={addData} style={{ width: "100%" }}>
          Add
        </button>

        <hr />

        <h3>Edit Values</h3>

        {values.map((v, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            {labels[i]}:
            <input
              type="number"
              value={v}
              onChange={(e) => editValue(i, e.target.value)}
              style={{ width: "80px", marginLeft: "10px" }}
            />
          </div>
        ))}

        <hr />

        <button
          onClick={deleteLast}
          style={{
            width: "100%",
            background: "red",
            color: "white",
            padding: "8px",
          }}
        >
          Delete Last Item
        </button>
      </div>
    </div>
  );
}
