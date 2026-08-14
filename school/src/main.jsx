import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Playgroup from './components/Courses_components/Playgroup.jsx'
import Nursery from './components/Courses_components/Nursery.jsx'
import Primary from './components/Courses_components/Primary.jsx'
import Admission from './components/Admission_components/Admission.jsx'
import ContactUs from './components/Contact.jsx'

import FeeStructure from './components/FeeStructure.jsx'
import Holidays from './components/Holidays.jsx'

// ── Admin wiring ─────────────────────────────────────────────────────────
// If the app looks broken/blank after adding this file, the most likely
// cause is one of these four imports pointing at a path that doesn't exist
// yet in your project. Comment out this block (and the two spots marked
// below) to confirm the rest of the site renders fine, then re-add the
// files one at a time.
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/admin/ProctedRoute.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import GalleryPage from './pages/Gallery.jsx'
import NoticesPage from './pages/Noticepage.jsx'
// ─────────────────────────────────────────────────────────────────────────

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "courses/playgroup", element: <Playgroup /> },
      { path: "courses/nursery", element: <Nursery /> },
      { path: "courses/primary", element: <Primary /> },
      { path: "admission/process", element: <Admission /> },
      { path: "contact", element: <ContactUs /> },
      { path: "gallery", element: <GalleryPage/>},
      {path: "notices" , element:<NoticesPage/>},
      { path: "feestructure", element: <FeeStructure /> },
      { path: "holidays", element: <Holidays /> },

      // Admin login sits outside ProtectedRoute — it's the one admin page
      // an unauthenticated visitor is allowed to reach.
      { path: "admin/login", element: <AdminLogin /> },

      // Everything under this element requires a valid session.
      {
        element: <ProtectedRoute />,
        children: [
          { path: "admin/dashboard", element: <AdminDashboard /> },
        ],
      },

      { path: "*", element: <Navigate to="/home" replace /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)