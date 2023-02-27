import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.js';
import { Home, Library } from './components/index.js';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: []
    },
    {
      path: "/library",
      element: <Library />,
    }
]);

ReactDOM.render(
<App>
    <RouterProvider router = { router } />
</App>, document.getElementById('root'));