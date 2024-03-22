import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Sidebar from "./navigation/sidebar";
import TopBar from "./navigation/topbar";
import Dashboard from "./live_dashboard/dashboard";
import Analysis from "./analysis/analysis";
import Settings from "./settings";
import "./App.css";

function App() {
  useEffect(() => {
    if (window.electron) {
      window.electron.ipcRenderer.once("ipc-example", (arg) => {
        console.log(arg);
      });
      window.electron.ipcRenderer.sendMessage("ipc-example", ["ping"]);
    }
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const dashboardTabs = [
    { label: "Home", route: "/dashboard/home" },
    { label: "Car Telemetry", route: "/dashboard/cartelemetry" },
    { label: "Car Setup", route: "/dashboard/carsetup" },
    { label: "Vehicle Condition", route: "/dashboard/vehiclecondition" },
    { label: "Lap", route: "/dashboard/lap" },
    { label: "Session", route: "/dashboard/session" },
  ];

  const analysisTabs = [
    { label: "Tyre Strategy", route: "/analysis/tyrestrategy" },
  ];

  const settingsTabs = [
    { label: "Settings Tab 1", route: "/dashboard/home" },
    { label: "Settings Tab 2", route: "/dashboard/home" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
          <div
            className={`MainContent ${
              isSidebarOpen ? "sidebarOpen" : "sidebarClosed"
            }`}
          >
            <Routes>
              <Route
                path="/dashboard/*"
                element={
                  <>
                    <TopBar tabs={dashboardTabs} />
                    <Dashboard />
                  </>
                }
              />
              <Route
                path="/analysis/*"
                element={
                  <>
                    <TopBar tabs={analysisTabs} />
                    <Analysis />
                  </>
                }
              />
              <Route
                path="/settings/*"
                element={
                  <>
                    <p>To be done.</p>
                    <Settings />
                  </>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
