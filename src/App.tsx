import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/authContext";
import { LandingPage } from "./components/landing-page/LandingPage";
import ServerErrorPage from "./components/server-error-page/ErrorPage";
import { LoginPage } from "./components/login-page/LoginPage";
import { RegisterPage } from "./components/register-page/RegisterPage";
import { ColdStartPage } from "./components/cold-start-page/ColdStartPage";
import { RecommendPage } from "./components/recommend-page/RecommendPage";
import { UserLibraryPage } from "./components/user-library-page/UserLibraryPage";
import { PersonalizedRecommendPage } from "./components/recommend-page/PersonalizedRecommendPage";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/server-error" element={<ServerErrorPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="top10" element={<ColdStartPage />} />
          <Route path="my-library" element={<UserLibraryPage />} />
          <Route path="/recommend" element={<RecommendPage />} />
          <Route path="/recommend-personalized" element={<PersonalizedRecommendPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
