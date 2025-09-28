
import './App.module.css';


  // src/App.js
import React from "react";
import DashboardLayout from "./Components/Layout/DashboardLayout";
import { ThemeProvider } from "./Components/context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
     <DashboardLayout>

      </DashboardLayout>
    </ThemeProvider>
  );
}



export default App;
