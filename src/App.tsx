import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'

import AppLayout from './layouts/AppLayout'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import VerifyAccount from './pages/VerifyAccount'
import AccountPage from './pages/AccountPage.1'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <MainPage className="mb-40" />,
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
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
