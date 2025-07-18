// src/App.tsx
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoadingSpinner } from "./components/loading-spinner";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import { Toaster } from "./components/ui/sonner";
import { CartProvider } from "./context/CartContext";
import { CartSidebar } from "./components/cart-sidebar";
import { ProtectedRoute } from "./components/protected-route"; // 1. Importe a rota protegida
import { getAuthUser } from "./lib/jwt";

// Seus componentes lazy-loaded permanecem os mesmos
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
const RegisterPrestadorPage = lazy(() => import("./app/register/RegisterPrestadorPage"));
const PrestadorDashboardPage = lazy(() => import("./app/prestador/PrestadorDashboardPage"));

function ProtectedPrestadorRoute({ children }: { children: React.ReactNode }) {
  const user = getAuthUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== "prestador") {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CartProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register-prestador" element={<RegisterPrestadorPage />} />
            <Route path="/prestador" element={<ProtectedPrestadorRoute><PrestadorDashboardPage /></ProtectedPrestadorRoute>} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />}>
                <Route index element={<DashboardContent />} />
                <Route path="hotels" element={<HotelsPage />} />
                <Route path="tickets" element={<TicketsPage />} />
                <Route path="psychologist" element={<PsychologistPage />} />
                <Route path="caregivers" element={<CaregiversPage />} />
                <Route path="calendar" element={<CalendarPage />} />
              </Route>

              <Route path="/purchase" element={<DashboardPage />}>
                <Route path="history" index element={<PurchaseHistoryPage />} />
              </Route>

              <Route path="/settings" element={<DashboardPage />}>
                <Route index element={<SettingsPage />} />
              </Route>
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