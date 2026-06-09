import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/TelegramProvider";
import Layout from "./components/Layout";
import Search from "./pages/Search";
import SeriesDetail from "./pages/SeriesDetail";
import Stats from "./pages/Stats";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminSeries from "./pages/admin/SeriesManage";
import AdminLogs from "./pages/admin/Logs";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Search />} />
            <Route path="/series/:slug" element={<SeriesDetail />} />
            <Route
              path="/stats"
              element={
                <ProtectedRoute minTier="subscriber">
                  <Stats />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute minTier="owner">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/series"
              element={
                <ProtectedRoute minTier="owner">
                  <AdminSeries />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/logs"
              element={
                <ProtectedRoute minTier="owner">
                  <AdminLogs />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
