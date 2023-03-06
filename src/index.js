import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.js';
import { Home, UserPage, AdminPage, Library, Orders } from './components/index.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>
    },
    {
      path: '/user',
      element: <UserPage></UserPage>
    },
    {
      path: '/admin',
      element: <AdminPage></AdminPage>
    },
    {
      path: '/library',
      element: <Library></Library>
    },
    {
      path: '/orders',
      element: <Orders></Orders>
    }
]);

ReactDOM.render(<App><RouterProvider router = { router }></RouterProvider></App>, document.getElementById('root'));