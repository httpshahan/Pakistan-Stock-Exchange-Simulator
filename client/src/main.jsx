import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/tailwind.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom';
import Router from './router.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      {/* <App />  
      <ToastContainer /> */}
      <RouterProvider router={Router} />
  </React.StrictMode>,
)
