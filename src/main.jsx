import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {HashRouter, Routes, Route} from "react-router-dom";

import App from "./App.jsx";
import Chart_1 from "./charts/Chart_1.jsx";
import Chart_2 from "./charts/Chart_2.jsx";
import Chart_3 from "./charts/Chart_3.jsx";
import Chart_4 from "./charts/Chart_4.jsx";
import Chart_5 from "./charts/Chart_5.jsx";
import Chart_6 from "./charts/Chart_6.jsx";
import Chart_7 from "./charts/Chart_7.jsx";
import Chart_8 from "./charts/Chart_8.jsx";
import Chart_9 from "./charts/Chart_9.jsx";
import Chart_10 from "./charts/Chart_10.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/chart_1" element={<Chart_1/>}/>
        <Route path="/chart_2" element={<Chart_2/>}/>
        <Route path="/chart_3" element={<Chart_3/>}/>
        <Route path="/chart_4" element={<Chart_4/>}/>
        <Route path="/chart_5" element={<Chart_5/>}/>
        <Route path="/chart_6" element={<Chart_6/>}/>
        <Route path="/chart_7" element={<Chart_7/>}/>
        <Route path="/chart_8" element={<Chart_8/>}/>
        <Route path="/chart_9" element={<Chart_9/>}/>
        <Route path="/chart_10" element={<Chart_10/>}/>
      </Routes>
    </HashRouter>
  </StrictMode>
);
