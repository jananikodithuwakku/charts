import { useRef, useState } from "react";
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

// register Chart.js components
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

  const [labels, setLabels] = useState(["Jan", "Feb", "Mar", "Apr"]);
  const [values, setValues] = useState([10, 20, 15, 30]);

  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Sales",
        data: values,
        borderColor: "rgba(16,48,116,0.96)",
        backgroundColor: "rgba(7,7,90,0.3)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: false,
    onClick: (event) => {
      const chart = chartRef.current;
      if (!chart) return;

      const pos = getRelativePosition(event, chart);
      const xValue = chart.scales.x.getValueForPixel(pos.x);
      const yValue = chart.scales.y.getValueForPixel(pos.y);

      console.log("Clicked X:", xValue);
      console.log("Clicked Y:", yValue);
    },
  };

  
  // add new point
  const addData = () => {
    if (newLabel === "" || newValue === "") return alert("Fill both fields!");

    setLabels([...labels, newLabel]);
    setValues([...values, Number(newValue)]);

    setNewLabel("");
    setNewValue("");

    chartRef.current.update();
  };

  // delete last value
  const deleteLast = () => {
    if (labels.length <= 1) return alert("At least 1 item required!");

    setLabels(labels.slice(0, -1));
    setValues(values.slice(0, -1));

    chartRef.current.update();
  };

  // edit existing value
  const editValue = (index, newVal) => {
    const updated = [...values];
    updated[index] = Number(newVal);
    setValues(updated);
    chartRef.current.update();
  };

  return (
    <div style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>
      
      <div style={{ width: "500px" }}>
        <h2>Editable Line Chart</h2>
        <Line ref={chartRef} data={data} options={options} width={600} height={300} />
      </div>

      <div
        style={{
          width: "280px",
          padding: "15px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h3>Add New Data</h3>
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
        <button
          onClick={addData}
          style={{ width: "100%", marginBottom: "15px" }}
        >
          Add
        </button>

        <hr />

        <h3>Edit Values</h3>
        {values.map((v, index) => (
          <div key={index} style={{ marginBottom: "8px" }}>
            {labels[index]}:
            <input
              type="number"
              value={v}
              onChange={(e) => editValue(index, e.target.value)}
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
