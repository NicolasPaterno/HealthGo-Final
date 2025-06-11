import { ThemeProvider } from './components/theme-provider'
import "./index.css"
import DashboardPage from './app/dashboard/DashboardPage'
import { Route, Router, RouterProvider, Routes } from "react-router-dom"
import LoginPage from './app/login/LoginPage'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/Dashboard' element={<DashboardPage />} />
        </Routes>
    </ThemeProvider>
  )
}

export default App
