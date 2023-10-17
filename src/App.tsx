import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'

import AppLayout from './layouts/AppLayout'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import VerifyAccount from './pages/VerifyAccount'
import AccountPage from './pages/AccountPage'
import AdminLayout from './layouts/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AdminProductsLayout from './layouts/AdminProductsLayout'
import AdminProductsPage from './pages/AdminProductsPage'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      { path: 'auth/login', element: <LoginPage className="pt-20 pb-40" /> },
      {
        path: 'auth/register',
        element: <RegisterPage className="pt-20 pb-40" />,
      },
      {
        path: 'auth/verify-account',
        element: <VerifyAccount className="pt-20 mb-40" />,
      },
      { path: 'user/account', element: <AccountPage /> },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    path: '/admin',
    children: [
      {
        path: 'products',
        element: <AdminProductsLayout />,
        children: [
          { element: <AdminProductsPage />, index: true },
          {
            path: 'add',
            element: <h1>Add product</h1>,
          },
        ],
      },
    ],
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
