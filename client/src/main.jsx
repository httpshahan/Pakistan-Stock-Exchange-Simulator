import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/tailwind.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom';
import Router from './router.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ToastContainer />
      <RouterProvider router={Router} />
  </React.StrictMode>,
)
