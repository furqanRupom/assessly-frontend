import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import App from "../App";
import About from "../pages/About/About";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassowrd";
import EmailVerify from "../pages/EmailVerify/EmailVerify";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import  DashboardLayout from "../layout/DashboardLayout";

import {ProtectedRoute} from "../private/ProtectedRoute";
import { routesGenerator } from "../utils/routesGenerator";
import { StudentSidebarPaths } from "./student.routes";
import { AdminSidebarPaths } from "./admin.routes";
import { SuperAdminSidebarPaths } from "./superAdmin.routes";
import Assessment from "@/pages/Assessment/Assessment";
import StudentDashboardLayout from "@/layout/StudentLayout";
import HowItWorks from "@/pages/HowItWorks/HowItWorks";
// import ChangePassword from "../pages/ChangePassword";

const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/about",
        element: <About />,
      },
     {
      path:"/how-it-works",
      element:<HowItWorks />
     }
    ],
  },
  
  {
    path: "/student",
    element: <ProtectedRoute role="student"><StudentDashboardLayout /></ProtectedRoute>,
    children: routesGenerator(StudentSidebarPaths)
  },
  {
    path: "/admin",
    element: <ProtectedRoute role="admin"><DashboardLayout /></ProtectedRoute>,
    children: routesGenerator(AdminSidebarPaths)
  },
  {
    path: "/superAdmin",
    element: <ProtectedRoute role="superAdmin"><DashboardLayout /></ProtectedRoute>,
    children: routesGenerator(SuperAdminSidebarPaths)
  },
  // {
  //   path: "/admin",
  //   element: (
  //     <ProtectedRoute role="admin">
  //       <App />
  //     </ProtectedRoute>
  //   ),
  //   children: routesGenerator(AdminSidebarPaths),
  // },
  // {
  //   path: "/faculty",
  //   element: (
  //     <ProtectedRoute role="faculty">
  //       <App />
  //     </ProtectedRoute>
  //   ),
  //   children: routesGenerator(FacultyPaths),
  // },
  // {
  //   path: "/student",
  //   element: (
  //     <ProtectedRoute role="student">
  //       <App />
  //     </ProtectedRoute>
  //   ),
  //   children: routesGenerator(StudentPaths),
  // },
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
  // {
  //   path: "/need-password-change",
  //   element: <ChangePassword />,
  // },
  // {
  //   path: "/register",
  //   element: <About />,
  // },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/email-verify",
    element: <EmailVerify />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

export default router;
