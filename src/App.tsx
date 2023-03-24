import React from 'react';
import './App.css';
import Login from './features/Login/Login';
import Index from './features/Index/Index'
import { useRoutes } from "react-router-dom";

function App() {
  const routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/index", element: <Index /> }
  ]);
  return routes;
}

export default App;
