import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'

import AppLayout from './layouts/AppLayout'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import VerifyAccount from './pages/VerifyAccount'
import AccountPage from './pages/AccountMainPage'
import AdminLayout from './layouts/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AdminProductsLayout from './layouts/AdminProductsLayout'
import AdminProductsPage from './pages/AdminProductsPage'
import AdminAddProductPage from './pages/AdminAddProductPage'
import AccountLayout from './layouts/AccountLayout'
import AccountMainPage from './pages/AccountMainPage'
import AccountFavoritePage from './pages/AccountFavoritePage'
import AccountAddressPage from './pages/AccountAddressPage'

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
      {
        element: (
          <ProtectedRoute roles={['admin', 'user']}>
            <AccountLayout className="pt-24 pb-16" />
          </ProtectedRoute>
        ),
        path: 'user/account',
        children: [
          {
            element: <AccountMainPage />,
            path: 'orders',
            index: true,
          },
          {
            element: <AccountFavoritePage />,
            path: 'favorite',
          },
          {
            element: <AccountAddressPage />,
            path: 'addresses',
          },
        ],
      },
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
            path: 'addProduct',
            element: <AdminAddProductPage />,
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
