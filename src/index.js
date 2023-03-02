import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.js';
import { Home, UserPage, AdminPage, Library, HookahBowl } from './components/index.js';

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
      path: '/hookahbowl',
      element: <HookahBowl></HookahBowl>
    }
]);

ReactDOM.render(<App><RouterProvider router = { router }></RouterProvider></App>, document.getElementById('root'));