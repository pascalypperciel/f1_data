import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Paper } from "@mui/material";

import TyreStrategy from "./tyre_strategy";

function Analysis() {

  const homeGridStyle: React.CSSProperties = {
    display: 'grid',
    gridGap: '20px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(700px, 1fr))',
    justifyContent: 'center'
  };

  const mainContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '20px',
  };

  const columnStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    flex: 1,
  };

  const paperStyle: React.CSSProperties = {
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div>
      <Routes>
        <Route
          path="tyrestrategy"
          element={
            <TyreStrategy></TyreStrategy>
          }
        />
      </Routes>
    </div>
  );
}

export default Analysis;
