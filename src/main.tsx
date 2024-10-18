import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import LoginPage from './pages/login/LoginPage.tsx';
import HomePage from './pages/home/HomePage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import SignUpPage from './pages/signup/SignUpPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        index: true,
        element: <LoginPage />,
      },
      {
        path: '/home',
        element: <HomePage />,
        loader: () => {
          if (!sessionStorage.getItem('userName')) {
            return redirect('/');
          }
          return null;
        },
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
