import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoadingSpinner } from "./components/loading-spinner";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import { Toaster } from "./components/ui/sonner";
import { CartProvider } from "./context/CartContext";
import { CartSidebar } from "./components/cart-sidebar";

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
const PurchaseHistoryPage = lazy(() => import("./app/history/PurchaseHistoryPage"));

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CartProvider>
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

            <Route path="/purchase" element={<DashboardPage />}>
              <Route index element={<DashboardContent />} />
              <Route path="history" element={<PurchaseHistoryPage />} />
              </Route>

            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Suspense>
        <CartSidebar />
        <Toaster richColors position="top-center" />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;