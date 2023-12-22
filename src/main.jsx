import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import ErrorPage from './components/pages/errorPage/ErrorPage.jsx';
import Home from './components/pages/home/Home.jsx';
import AuthProvider from './components/provider/AuthProvider.jsx';
import SignUp from './components/pages/sign/SignUp.jsx';
import SignIn from './components/pages/sign/SignIn.jsx';
import Dashboard from './components/pages/dashboard/Dashboard.jsx';
import PrivateRouter from './components/privateRouter/PrivateRouter.jsx';
import AddTask from './components/pages/addTask/AddTask.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>
      },
      {
        path: "/signIn",
        element: <SignIn></SignIn>
      },
      {
        path: "/dashboard",
        element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>
      },
      {
        path: "/addTask",
        element: <AddTask></AddTask>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
