import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.js';
import { Home, UserPage, AdminPage, Library, Orders, AdminOrders, AdminLibrary } from './components';
import { PrivateRoute, ReversePrivateRoute, PrivateRouteAdmin } from './routes';
import { CurrentBowlContext } from './global';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ReversePrivateRoute element = { Home }></ReversePrivateRoute>
  },
  {
    path: '/user',
    element: <PrivateRoute element = { UserPage }></PrivateRoute>
  },
  {
    path: '/library',
    element: <PrivateRoute element = { Library }></PrivateRoute>
  },
  {
    path: '/orders',
    element: <PrivateRoute element = { Orders }></PrivateRoute>
  },
  {
    path: '/admin',
    element: <PrivateRouteAdmin element = { AdminPage }></PrivateRouteAdmin>
  },
  {
    path: '/adminlibrary',
    element: <PrivateRouteAdmin element = { AdminLibrary }></PrivateRouteAdmin>
  },
  {
    path: '/adminorders',
    element: <PrivateRouteAdmin element = { AdminOrders }></PrivateRouteAdmin>
  }
]);

const Root = () => {
  const [currentBowl, setCurrentBowl] = React.useState({
    tobacco1: '',
    percent1: 0,
    tobacco2: '',
    percent2: 0,
    tobacco3: '',
    percent3: 0,
    tobacco4: '',
    percent4: 0,
    tobacco5: '',
    percent5: 0
  });

  return (
    <CurrentBowlContext.Provider value = {{ currentBowl, setCurrentBowl }}>
      <RouterProvider router = { router }>
        <App></App>
      </RouterProvider>
    </CurrentBowlContext.Provider>
  );
};

ReactDOM.render(<Root></Root>, document.getElementById('root'));