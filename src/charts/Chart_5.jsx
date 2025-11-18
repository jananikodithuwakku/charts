import { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart_5() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const [labels, setLabels] = useState(["Red", "Green", "Blue"]);
  const [values, setValues] = useState([300, 50, 100]);
  const [bgColors, setBgColors] = useState([
    "rgba(116, 16, 21, 1)",
    "rgba(16, 116, 49, 0.93)",
    "rgba(16, 34, 116, 1)",
  ]);

  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    chartRef.current = new ChartJS(ctx, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: bgColors,
          },
        ],
      },
      options: { responsive: false },
    });

    return () => chartRef.current.destroy();
  }, []);

  // update chart on data change
  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.data.labels = labels;
    chartRef.current.data.datasets[0].data = values;
    chartRef.current.data.datasets[0].backgroundColor = bgColors;
    chartRef.current.update();
  }, [labels, values, bgColors]);

  const addData = () => {
    if (!newLabel || newValue === "") return alert("Fill both fields!");

    setLabels([...labels, newLabel]);
    setValues([...values, Number(newValue)]);

    // auto-generate color
    const randomColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
    setBgColors([...bgColors, randomColor]);

    setNewLabel("");
    setNewValue("");
  };

  // edit value
  const editValue = (index, newVal) => {
    const updated = [...values];
    updated[index] = Number(newVal);
    setValues(updated);
  };

  // edit label
  const editLabel = (index, newLab) => {
    const updated = [...labels];
    updated[index] = newLab;
    setLabels(updated);
  };

  // delete label/value
  const deleteItem = (index) => {
    setLabels(labels.filter((_, i) => i !== index));
    setValues(values.filter((_, i) => i !== index));
    setBgColors(bgColors.filter((_, i) => i !== index));
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <canvas ref={canvasRef} width={600} height={600}></canvas>

      <div style={{width: "280px",
          padding: "15px",
          background: "#f3f3f3",
          borderRadius: "8px", }}>
        <h2>Doughnut Chart Editor</h2>

        <h3>Add New</h3>
        <input
          type="text"
          placeholder="Label"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
        />
        <input
          type="number"
          placeholder="Value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button onClick={addData}>Add</button>

        <hr />

        <h3>Edit Items</h3>
        {labels.map((label, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="text"
              value={label}
              onChange={(e) => editLabel(index, e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <input
              type="number"
              value={values[index]}
              onChange={(e) => editValue(index, e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <button
              style={{
                marginLeft: "5px",
                background: "red",
                color: "white",
                border: "none",
                padding: "3px 7px",
              }}
              onClick={() => deleteItem(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
