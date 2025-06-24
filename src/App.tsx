import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoadingSpinner } from "./components/loading-spinner";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";

// --- Páginas carregadas sob demanda (Lazy Loading) ---
const LoginPage = lazy(() => import("./app/login/LoginPage"));
const RegisterPage = lazy(() => import("./app/register/RegisterPage"));
const DashboardPage = lazy(() => import("./app/dashboard/DashboardPage"));
const DashboardContent = lazy(() => import("./app/dashboard/DashboardContent"));
const SettingsPage = lazy(() => import("./app/settings/SettingsPage"));
const HotelsPage = lazy(() => import("./app/hotels/HotelsPage"));
const TicketsPage = lazy(() => import("./app/tickets/TicketsPage"));
const PsychologistPage = lazy(() => import("./app/psychologists/PsychologistPage"));
const CaregiversPage = lazy(() => import("./app/caregivers/CaregiversPage"));
const CalendarPage = lazy(() => import("./app/calendar/CalendarPage"));

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* Suspense mostra um fallback enquanto o componente da rota é carregado */}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={<DashboardPage />}>
            <Route index element={<DashboardContent />} />
            <Route path="hotels" element={<HotelsPage />} />
            <Route path="tickets" element={<TicketsPage />} />
            <Route path="psychologist" element={<PsychologistPage />} />
            <Route path="caregivers" element={<CaregiversPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;