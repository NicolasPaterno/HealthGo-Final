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
import { RoleProtectedRoute } from "./components/role-protected-route";
import LandingPage from "./components/landing-page";
import WorkWithUsPage from "./components/work-with-us-page";
import HotelOwnerRegisterForm from "./components/hotel-owner-register-form";

// Seus componentes lazy-loaded permanecem os mesmos
const LoginPage = lazy(() => import("./app/login/LoginPage"));
const ForgotPasswordPage = lazy(() => import("./app/forgot-password/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./app/forgot-password/ResetPasswordPage"));
const RegisterPage = lazy(() => import("./app/register/RegisterPage"));
const DashboardPage = lazy(() => import("./app/dashboard/DashboardPage"));
const DashboardContent = lazy(() => import("./app/dashboard/DashboardContent"));
const SettingsPage = lazy(() => import("./app/settings/SettingsPage"));
const HotelsPage = lazy(() => import("./app/hotels/HotelsPage"));
const TicketsPage = lazy(() => import("./app/tickets/TicketsPage"));
const PsychologistPage = lazy(
  () => import("./app/psychologists/PsychologistPage")
);
const CaregiversPage = lazy(() => import("./app/caregivers/CaregiversPage"));
const CalendarPage = lazy(() => import("./app/calendar/CalendarPage"));
const HospitalsPage = lazy(() => import("./app/hospitals/HospitalsPage"));
const PurchaseHistoryPage = lazy(() => import("./app/history/PurchaseHistoryPage"));
const DashboardGerentePage = lazy(() => import("./app/dashboard/DashboardGerentePage"));
const DashboardGerenteContent = lazy(() => import("./app/dashboard/DashboardGerenteContent"));
const HotelRegisterPage = lazy(() => import("./app/hotels/HotelRegisterPage"));
const HotelsListPage = lazy(() => import("./app/hotels/HotelsListPage"));
const HotelProfilePage = lazy(() => import("./app/hotels/HotelProfilePage"));
const HotelEditPage = lazy(() => import("./app/hotels/HotelEditPage"));

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CartProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/esqueci-senha" element={<ForgotPasswordPage />} />
            <Route path="/redefinir-senha/:token" element={<ResetPasswordPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/work-with-us" element={<WorkWithUsPage />} />
            <Route
              path="/work-with-us/hotel-register"
              element={<HotelOwnerRegisterForm />}
            />

            <Route element={<ProtectedRoute />}>
              <Route element={<RoleProtectedRoute allowedRoles={["Consumidor"]} />}>
                <Route path="/dashboard" element={<DashboardPage />}>
                  <Route index element={<DashboardContent />} />
                  <Route path="hotels" element={<HotelsPage />} />
                  <Route path="tickets" element={<TicketsPage />} />
                  <Route path="psychologist" element={<PsychologistPage />} />
                  <Route path="caregivers" element={<CaregiversPage />} />
                  <Route path="calendar" element={<CalendarPage />} />
                  <Route path="hospitals" element={<HospitalsPage />} />
                </Route>
                <Route path="/settings" element={<DashboardPage />}>
                  <Route index element={<SettingsPage />} />
                </Route>
              </Route>

              <Route element={<RoleProtectedRoute allowedRoles={["Gerente"]} />}>
                <Route path="/dashboard-gerente" element={<DashboardGerentePage />}>
                  <Route index element={<DashboardGerenteContent />} />
                  <Route path="hotels" element={<HotelRegisterPage />} />

                  <Route />
                </Route>
                <Route path="/settings" element={<DashboardGerentePage />}>
                  <Route index element={<SettingsPage />} />
                </Route>
              </Route>

              <Route path="/purchase" element={<DashboardPage />}>
                <Route path="history" index element={<PurchaseHistoryPage />} />
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
