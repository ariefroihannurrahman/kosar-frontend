import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavbarPage from "./components/Navs/NavbarPage";
import HomeScreen from "./components/Homes/HomeScreen";
import RegisterScreen from "./components/Auths/RegisterScreen";
import LoginScreen from "./components/Auths/LoginScreen";
import AdminPanel from "./components/Admins/AdminPanel";
import CreateReporting from "./components/Reportings/CreateReportings";
import DetailsReporting from "./components/Reportings/DetailsReportings";
import Welcome from "./components/Homes/WelcomeScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Welcome />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/tambahkeluhan" element={<CreateReporting />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />

          <Route
            path="/admin"
            element={
              <>
                <NavbarPage />
                <AdminPanel />
              </>
            }
          />
          <Route
            path="/detailkeluhan/:complaint_id"
            element={<DetailsReporting />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
