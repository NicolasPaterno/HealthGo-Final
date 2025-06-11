import { Navigate, Route, Routes } from "react-router-dom"
import DashboardContent from "./app/dashboard/DashboardContent"
import DashboardPage from "./app/dashboard/DashboardPage"
import HotelsPage from "./app/hotels/HotelsPage"
import LoginPage from "./app/login/LoginPage"
import SettingsPage from "./app/settings/SettingsPage"
import { ThemeProvider } from "./components/theme-provider"
import "./index.css"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Rota pai que define o layout do Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />}>
          {/* Rotas filhas que serão renderizadas dentro do Outlet do DashboardPage */}
          <Route index element={<DashboardContent />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="places" element={<HotelsPage />} />
          {/* Adicione outras rotas filhas aqui, como "tickets", "psychologist", etc. */}
        </Route>

        {/* Redirecionamento da raiz para o dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App