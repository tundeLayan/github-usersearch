import React from "react";
import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search";
import "./App.css";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <div className="App">
      <MainLayout>
        <Routes>
          <Route path={"/"} element={<Search />} />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;
