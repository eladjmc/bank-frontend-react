import React from 'react';
import './styles/App.scss';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from './pages/ErrorPage';
import Welcome from './pages/WelcomePage';
import Navbar from './components/navbar/Navbar';
import User from './pages/UserPage';
import ShowInfoPage from './pages/userActionPages/ShowInfoPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { path: "/", element: <Welcome /> },
        { path: "/user", element: <User /> },
        { path: "/user/getinfo/:id", element: <ShowInfoPage /> },
        { path: "/user/changecash/:id", element: <User /> },
        { path: "/user/changecredit/:id", element: <User /> },
        { path: "/user/transfercash/:id", element: <User /> },
        { path: "/user/deleteaccount/:id", element: <User /> },
        { path: "*", element: <Error /> }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
