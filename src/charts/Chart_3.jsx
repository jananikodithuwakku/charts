import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export default function Chart_3() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const [labels, setLabels] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
  ]);

  const [values, setValues] = useState([65, 59, 80, 81, 56]);

  const [bgColors, setBgColors] = useState([
    "rgba(184, 11, 49, 0.4)",
    "rgba(160, 134, 20, 0.42)",
    "rgba(71, 143, 12, 0.42)",
    "rgba(5, 132, 136, 0.49)",
    "rgba(2, 6, 59, 0.47)",
  ]);

  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");

  // create chart once
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Votes",
            data: values,
            backgroundColor: bgColors,
            borderColor: "rgba(0,0,0,0.7)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    return () => chartRef.current.destroy();
  }, []);

  // update chart when data changes
  useEffect(() => {
    if (!chartRef.current) return;

    chartRef.current.data.labels = labels;
    chartRef.current.data.datasets[0].data = values;
    chartRef.current.data.datasets[0].backgroundColor = bgColors;

    chartRef.current.update();
  }, [labels, values, bgColors]);

  // add new bar
  const addData = () => {
    if (!newLabel || newValue === "") return alert("Fill both fields!");

    setLabels([...labels, newLabel]);
    setValues([...values, Number(newValue)]);

    const randomColor = `hsl(${Math.random() * 360}, 60%, 60%)`;
    setBgColors([...bgColors, randomColor]);

    setNewLabel("");
    setNewValue("");
  };

  // edit existing value
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

  // delete bar
  const deleteItem = (index) => {
    setLabels(labels.filter((_, i) => i !== index));
    setValues(values.filter((_, i) => i !== index));
    setBgColors(bgColors.filter((_, i) => i !== index));
  };

  return (
    <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
      <canvas ref={canvasRef} width={800} height={500}></canvas>

      <div  style={{
          width: "280px",
          padding: "15px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}>
        <h2>Bar Chart Editor</h2>

        <h3>Add New</h3>
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
        <button onClick={addData} style={{ width: "100%", marginBottom: "15px" }}>Add</button>

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
