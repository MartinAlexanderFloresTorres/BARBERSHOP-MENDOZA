import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import LayoutAuth from './layouts/LayoutAuth'
import HomePage from './pages/public/HomePage'
import LoginPage from './pages/private/auth/LoginPage'
import RegisterPage from './pages/private/auth/RegisterPage'
import RecuperacionPage from './pages/private/auth/RecuperacionPage'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/auth" element={<LayoutAuth />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="recuperacion" element={<RecuperacionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
