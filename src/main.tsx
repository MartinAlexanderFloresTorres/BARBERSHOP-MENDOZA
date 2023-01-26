import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import '@sweetalert2/theme-dark'

createRoot(document.getElementById('root') as HTMLElement).render(<App />)
