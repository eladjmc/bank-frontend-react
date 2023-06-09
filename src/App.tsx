import React from 'react';
import './styles/App.scss';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from './pages/ErrorPage';
import Welcome from './pages/WelcomePage';
import Navbar from './components/navbar/Navbar';
import User from './pages/UserPage';
import ShowInfoPage from './pages/userActionPages/ShowInfoPage';
import UpdateCashPage from './pages/userActionPages/UpdateCashPage';
import TransferCashPage from './pages/userActionPages/TransferCashPage';
import ActionsPage from './pages/ActionsPage';
import AddUserPage from './pages/userActionPages/AddUserPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { path: "/", element: <Welcome /> },
        { path: "/user", element: <User /> },
        { path: "/actions", element: <ActionsPage /> },
        { path: "/actions/add-user", element: <AddUserPage /> },
        { path: "/user/getinfo/:id", element: <ShowInfoPage /> },
        { path: "/user/deposit-cash/:id", element: <UpdateCashPage isCash={true} isAdding={true} /> },
        { path: "/user/withdraw-cash/:id", element: <UpdateCashPage isCash={true} isAdding={false} /> },
        { path: "/user/change-credit/:id", element: <UpdateCashPage isCash={false} isAdding={true} /> },
        { path: "/user/transfer-cash/:id", element: <TransferCashPage /> },
        { path: "*", element: <Error /> }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
