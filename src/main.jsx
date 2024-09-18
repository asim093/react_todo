import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { RouterProvider } from 'react-router-dom'
import { publicroute } from '../routes/routes.jsx'

createRoot(document.getElementById('root')).render(
  <RouterProvider router={publicroute} >
    <App />
  </RouterProvider>
)
