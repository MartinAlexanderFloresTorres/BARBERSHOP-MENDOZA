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
import DashBoardPage from './pages/private/admin/DashBoardPage'
import ServiciosAdminPage from './pages/private/admin/ServiciosAdminPage'
import PerfilPage from './pages/private/auth/PerfilPage'
import ServiciosItem from './components/containers/servicios_items/ServiciosItem'
import ResumenItem from './components/containers/servicios_items/ResumenItem'
import InformacionCitaItem from './components/containers/servicios_items/InformacionCitaItem'
import NotFound from './pages/public/NotFound'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <MainProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="servicios" element={<ServiciosPage />}>
              <Route index element={<ServiciosItem />} />
              <Route path="informacion" element={<InformacionCitaItem />} />
              <Route path="resumen" element={<ResumenItem />} />
            </Route>
          </Route>

          <Route path="/auth" element={<LayoutAuth />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="recuperacion" element={<RecuperacionPage />} />
            <Route path="perfil" element={<PerfilPage />} />
          </Route>

          <Route path="admin" element={<LayoutAdmin />}>
            <Route index element={<DashBoardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="citas" element={<CitasPage />} />
            <Route path="servicios" element={<ServiciosAdminPage />} />
            <Route path="barberos" element={<BarberosPage />} />
            <Route path="reportes" element={<ReportesPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainProvider>
    </BrowserRouter>
  )
}

export default App
