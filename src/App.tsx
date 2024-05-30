import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import { StudyHoursProvider } from "./components/Contexts/StudyTimeContext";

function App() {
  return (
    <StudyHoursProvider>
      <div className="App">
        <Layout />
      </div>
    </StudyHoursProvider>
  );
}

export default App;
