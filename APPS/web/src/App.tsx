// src/App.tsx
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingSpinner } from "./components/loading-spinner";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import { Toaster } from "./components/ui/sonner";
import { CartProvider } from "./context/CartContext";
import { CartSidebar } from "./components/cart-sidebar";
import { ProtectedRoute } from "./components/protected-route"; // 1. Importe a rota protegida
import { RoleProtectedRoute } from "./components/role-protected-route";
import HistoryPage from "./app/history/HistoryPage"; // Importe a HistoryPage
import ViewServicosPage from "./app/prestadorservico/ViewServicosPage";
import AgendaPrestadorPage from "./app/prestadorservico/AgendaPrestadorPage";
import HistoricoServicosPage from "./app/prestadorservico/HistoricoServicosPage";
import CadastrarServicoPage from "./app/prestadorservico/CadastrarServicoPage";
import ProfilePage from "./app/prestadorservico/ProfilePage";
import DashboardPrestadorServicoPage from "./app/dashboard/DashboardPrestadorServicoPage";
import QuartosPage from "./app/dashboard/QuartosPage";
import ViewHotelsPage from "./app/hotels/ViewHotelsPage";
import CadastrarHotelPage from "./app/hotels/CadastrarHotelPage";
import DashboardGerenteContent from "./app/dashboard/DashboardGerenteContent";
import DashboardGerentePage from "./app/dashboard/DashboardGerentePage";


const LoginPage = lazy(() => import("./app/login/LoginPage"));
const ForgotPasswordPage = lazy(() => import("./app/forgot-password/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./app/forgot-password/ResetPasswordPage"));
const RegisterPage = lazy(() => import("./app/register/RegisterPage"));
const RegisterPrestadorServicoPage = lazy(() => import("./app/register/RegisterPrestadorServicoPage"));
const RegisterManagerPage = lazy(() => import("./app/register/RegisterManagerPage"));
const DashboardPage = lazy(() => import("./app/dashboard/DashboardPage"));
const DashboardContent = lazy(() => import("./app/dashboard/DashboardContent"));
const SettingsPage = lazy(() => import("./app/settings/SettingsPage"));
const HotelsBrowsePage = lazy(() => import("./app/hotels/HotelsBrowsePage"));
const HotelDetailPage = lazy(() => import("./app/hotels/HotelDetailPage"));
const TicketsPage = lazy(() => import("./app/tickets/TicketsPage"));
const PsychologistPage = lazy(() => import("./app/psychologists/PsychologistPage"));
const CaregiversPage = lazy(() => import("./app/caregivers/CaregiversPage"));
const CalendarPage = lazy(() => import("./app/calendar/CalendarPage"));
const HospitalsPage = lazy(() => import("./app/hospitals/HospitalsPage"));
const PrestadoresPage = lazy(() => import("./app/prestadorservico/PrestadoresPage"));
const LandingPage = lazy(() => import("./app/landing/LandingPage"));
const WorkWithUsPage = lazy(() => import("./app/landing/WorkWithUsPage"));

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
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
                  <Route path="hotels" element={<HotelsBrowsePage />} />
                  <Route path="tickets" element={<TicketsPage />} />
                  <Route path="psychologist" element={<PsychologistPage />} />
                  <Route path="caregivers" element={<CaregiversPage />} />
                  <Route path="calendar" element={<CalendarPage />} />
                  <Route path="hospitals" element={<HospitalsPage />} />
                  <Route path="prestadores" element={<PrestadoresPage />} />
                  <Route path="history" element={<HistoryPage />} />
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
                  element={<DashboardPrestadorServicoPage />}
                >
                  <Route index element={<ProfilePage />} />
                  <Route
                    path="add-servico"
                    element={<CadastrarServicoPage />}
                  />
                  <Route path="view-servicos" element={<ViewServicosPage />} />
                  <Route path="agenda" element={<AgendaPrestadorPage />} />
                  <Route path="historico" element={<HistoricoServicosPage />} />
                </Route>
              </Route>

              {/* Rota de configurações acessível para todos os usuários autenticados */}
              <Route path="/settings" element={<SettingsPage />} />

            </Route>

            {/* Rotas públicas para visualização de hotéis */}
            <Route path="/hotel/:id" element={<HotelDetailPage />} />

            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/work-with-us" element={<WorkWithUsPage />} />
          </Routes>
        </Suspense>
        <CartSidebar />
        <Toaster richColors position="top-center" />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
