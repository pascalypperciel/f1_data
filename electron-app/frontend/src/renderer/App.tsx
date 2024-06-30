import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import {lightTheme, darkTheme } from "./settings/theme";
import Sidebar, { drawerWidth } from "./navigation/sidebar";
import TopBar from "./navigation/topbar";
import Dashboard from "./live_dashboard/dashboard";
import Analysis from "./analysis/analysis";
import Settings from "./settings/settings";
import CssBaseline from '@mui/material/CssBaseline';
import { WebSocketProvider } from "./live_dashboard/websocket";
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
  useEffect(() => {
      document.documentElement.style.setProperty('--drawer-width', `${drawerWidth}px`);
  }, [drawerWidth]);


  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('themeMode');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('themeMode', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

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
    { label: "Lap Time", route: "/analysis/laptime" },
    { label: "Tyre Wear", route: "/analysis/tyrewear" },
  ];

  const settingsTabs = [
    { label: "General", route: "/settings/general" },
    { label: "Database", route: "/settings/database" },
  ];

  return (
    <WebSocketProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
            <div className={`MainContent ${isSidebarOpen ? "sidebarOpen" : "sidebarClosed"}`}>
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
                      <Analysis darkMode={darkMode} />
                    </>
                  }
                />
                <Route
                  path="/settings/*"
                  element={
                    <>
                      <TopBar tabs={settingsTabs} />
                      <Settings onToggleDarkMode={() => setDarkMode(!darkMode)} darkMode={darkMode} />
                    </>
                  }
                />
              </Routes>
            </div>
          </div>
        </Router>
        <CssBaseline />
      </ThemeProvider>
    </WebSocketProvider>
  );
}

export default App;
