import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Urls from "./pages/Urls";
import Analytics from "./pages/Analytics";
import QRCenter from "./pages/QRCenter";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/urls"
        element={
          <PrivateRoute>
            <Urls />
          </PrivateRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <PrivateRoute>
            <Analytics />
          </PrivateRoute>
        }
      />

      <Route
        path="/qr-center"
        element={
          <PrivateRoute>
            <QRCenter />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />

      {/* 404 */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default App;