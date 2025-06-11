import { Route, Routes } from "react-router-dom"
import DashboardPage from "./app/dashboard/DashboardPage"
import LoginPage from "./app/login/LoginPage"
import SettingsPage from "./app/settings/SettingsPage"
import { ThemeProvider } from "./components/theme-provider"
import "./index.css"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App