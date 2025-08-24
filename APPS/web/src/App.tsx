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

// Seus componentes lazy-loaded permanecem os mesmos
const LoginPage = lazy(() => import("./app/login/LoginPage"));
const ForgotPasswordPage = lazy(
  () => import("./app/forgot-password/ForgotPasswordPage")
);
const ResetPasswordPage = lazy(
  () => import("./app/forgot-password/ResetPasswordPage")
);
const RegisterPage = lazy(() => import("./app/register/RegisterPage"));
const RegisterPrestadorServicoPage = lazy(
  () => import("./app/register/RegisterPrestadorServicoPage")
);
const RegisterManagerPage = lazy(
  () => import("./app/register/RegisterManagerPage")
);
const DashboardPage = lazy(() => import("./app/dashboard/DashboardPage"));
const DashboardContent = lazy(() => import("./app/dashboard/DashboardContent"));
const SettingsPage = lazy(() => import("./app/settings/SettingsPage"));
const HotelsPage = lazy(() => import("./app/hotels/HotelsPage"));
//const HotelsBrowsePage = lazy(() => import("./app/hotels/HotelsBrowsePage"));
//const HotelDetailPage = lazy(() => import("./app/hotels/HotelDetailPage"));
const TicketsPage = lazy(() => import("./app/tickets/TicketsPage"));
const PsychologistPage = lazy(
  () => import("./app/psychologists/PsychologistPage")
);
const CaregiversPage = lazy(() => import("./app/caregivers/CaregiversPage"));
const CalendarPage = lazy(() => import("./app/calendar/CalendarPage"));
const HospitalsPage = lazy(() => import("./app/hospitals/HospitalsPage"));
const PurchaseHistoryPage = lazy(
  () => import("./app/history/PurchaseHistoryPage")
);
const DashboardGerentePage = lazy(
  () => import("./app/dashboard/DashboardGerentePage")
);
const DashboardGerenteContent = lazy(
  () => import("./app/dashboard/DashboardGerenteContent")
);
const CadastrarHotelPage = lazy(
  () => import("./app/hotels/CadastrarHotelPage")
);
const ViewHotelsPage = lazy(() => import("./app/hotels/ViewHotelsPage"));
const QuartosPage = lazy(() => import("./app/dashboard/QuartosPage"));
const DashboardPrestadorPage = lazy(
  () => import("./app/dashboard/DashboardPrestadorServicoPage")
);
const DashboardPrestadorContent = lazy(
  () => import("./app/dashboard/DashboardPrestadorServicoContent")
);
const CadastrarServicoPage = lazy(
  () => import("./app/prestadorservico/CadastrarServicoPage")
);
const ViewServicosPage = lazy(
  () => import("./app/prestadorservico/ViewServicosPage")
);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CartProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/esqueci-senha" element={<ForgotPasswordPage />} />
            <Route
              path="/redefinir-senha/:token"
              element={<ResetPasswordPage />}
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/register-prestadorservico"
              element={<RegisterPrestadorServicoPage />}
            />
            <Route path="/register-manager" element={<RegisterManagerPage />} />

            <Route element={<ProtectedRoute />}>
              <Route
                element={<RoleProtectedRoute allowedRoles={["Consumidor"]} />}
              >
                <Route path="/dashboard" element={<DashboardPage />}>
                  <Route index element={<DashboardContent />} />
                  {/*<Route path="hotels" element={<HotelsBrowsePage />} />*/}
                  <Route path="hotels-management" element={<HotelsPage />} />
                  <Route path="tickets" element={<TicketsPage />} />
                  <Route path="psychologist" element={<PsychologistPage />} />
                  <Route path="caregivers" element={<CaregiversPage />} />
                  <Route path="calendar" element={<CalendarPage />} />
                  <Route path="hospitals" element={<HospitalsPage />} />
                </Route>
              </Route>

              <Route
                element={<RoleProtectedRoute allowedRoles={["Gerente"]} />}
              >
                <Route
                  path="/dashboard-gerente"
                  element={<DashboardGerentePage />}
                >
                  <Route index element={<DashboardGerenteContent />} />
                  <Route path="add-hotel" element={<CadastrarHotelPage />} />
                  <Route path="view-hotels" element={<ViewHotelsPage />} />
                  <Route path="quartos" element={<QuartosPage />} />
                </Route>
              </Route>

              <Route
                element={
                  <RoleProtectedRoute allowedRoles={["PrestadorServico"]} />
                }
              >
                <Route
                  path="/dashboard-prestador"
                  element={<DashboardPrestadorPage />}
                >
                  <Route index element={<DashboardPrestadorContent />} />
                  <Route
                    path="add-servico"
                    element={<CadastrarServicoPage />}
                  />
                  <Route path="view-servicos" element={<ViewServicosPage />} />
                </Route>
              </Route>

              {/* Rota de configurações acessível para todos os usuários autenticados */}
              <Route path="/settings" element={<SettingsPage />} />

              <Route path="/purchase" element={<DashboardPage />}>
                <Route path="history" index element={<PurchaseHistoryPage />} />
              </Route>

              {/* Rotas públicas para visualização de hotéis */}
              {/* <Route path="/hotel/:id" element={<HotelDetailPage />} />*/}
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
