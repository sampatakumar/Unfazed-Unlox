import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col justify-between bg-gray-50 text-gray-900 font-sans">
        <Navbar />
        <main className="flex-1">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
