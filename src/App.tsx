import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import LayoutAuth from './layouts/LayoutAuth'
import HomePage from './pages/public/HomePage'
import ServiciosPage from './pages/public/ServiciosPage'
import LoginPage from './pages/private/auth/LoginPage'
import RegisterPage from './pages/private/auth/RegisterPage'
import RecuperacionPage from './pages/private/auth/RecuperacionPage'
import MainProvider from './providers/MainProvider'

function App(): JSX.Element {
  return (
    <MainProvider>
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </MainProvider>
  )
}

export default App
