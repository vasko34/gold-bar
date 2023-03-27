import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.js';
import { Home, UserPage, AdminPage, Library, Orders } from './components/index.js';
import { CurrentBowlContext } from './secondary components/index.js';

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