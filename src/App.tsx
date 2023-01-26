import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import LayoutAuth from './layouts/LayoutAuth'
import HomePage from './pages/public/HomePage'
import ServiciosPage from './pages/public/ServiciosPage'
import LoginPage from './pages/private/auth/LoginPage'
import RegisterPage from './pages/private/auth/RegisterPage'
import RecuperacionPage from './pages/private/auth/RecuperacionPage'
import MainProvider from './providers/MainProvider'
import LayoutAdmin from './layouts/LayoutAdmin'
import UsersPage from './pages/private/admin/UsersPage'
import CitasPage from './pages/private/admin/CitasPage'
import BarberosPage from './pages/private/admin/BarberosPage'
import ReportesPage from './pages/private/admin/ReportesPage'
import HorariosPage from './pages/private/admin/HorariosPage'
import ConfiguracionPage from './pages/private/admin/ConfiguracionPage'
import DashBoardPage from './pages/private/admin/DashBoardPage'
import ServiciosAdminPage from './pages/private/admin/ServiciosAdminPage'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <MainProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="servicios" element={<ServiciosPage />} />
          </Route>

          <Route path="/auth" element={<LayoutAuth />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="recuperacion" element={<RecuperacionPage />} />
          </Route>

          <Route path="admin" element={<LayoutAdmin />}>
            <Route index element={<DashBoardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="citas" element={<CitasPage />} />
            <Route path="servicios" element={<ServiciosAdminPage />} />
            <Route path="barberos" element={<BarberosPage />} />
            <Route path="reportes" element={<ReportesPage />} />
            <Route path="horarios" element={<HorariosPage />} />
            <Route path="configuracion" element={<ConfiguracionPage />} />
          </Route>

          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </MainProvider>
    </BrowserRouter>
  )
}

export default App
