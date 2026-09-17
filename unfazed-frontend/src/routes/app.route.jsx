import {Route, Routes} from "react-router-dom";
import LoginPage from "../pages/therapist/login.jsx";
import RegisterPage from "../pages/therapist/register.jsx";
import DashboardPage from "../pages/therapist/dashboard.jsx";


function AppRoute() {
  return (
    <div>
      <Routes>
        <Route path="/therapist/login" element={<LoginPage />} />
        <Route path="/therapist/register" element={<RegisterPage />} />
        <Route path="/therapist/dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  );
}

export default AppRoute;