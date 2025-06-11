import { ThemeProvider } from './components/theme-provider'
import "./index.css"
import DashboardPage from './app/dashboard/DashboardPage'

function App() {
  return(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <LoginPage /> */}
      <DashboardPage/>
    </ThemeProvider>
  )
}

export default App
