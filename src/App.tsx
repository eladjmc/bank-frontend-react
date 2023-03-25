import React from 'react';
import './styles/App.scss';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from './pages/ErrorPage';
import Welcome from './pages/WelcomePage';
import Navbar from './components/navbar/Navbar';
import User from './pages/UserPage';
import ShowInfoPage from './pages/userActionPages/ShowInfoPage';
import UpdateCashPage from './pages/userActionPages/UpdateCashPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { path: "/", element: <Welcome /> },
        { path: "/user", element: <User /> },
        { path: "/user/getinfo/:id", element: <ShowInfoPage /> },
        { path: "/user/deposit-cash/:id", element: <UpdateCashPage isCash={true} isAdding={true} /> },
        { path: "/user/withdraw-cash/:id", element: <UpdateCashPage isCash={true} isAdding={false} /> },
        { path: "/user/change-credit/:id", element: <UpdateCashPage isCash={false} isAdding={true} /> },
        { path: "/user/transfercash/:id", element: <User /> },
        { path: "/user/deleteaccount/:id", element: <User /> },
        { path: "*", element: <Error /> }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
