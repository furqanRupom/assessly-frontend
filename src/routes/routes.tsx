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
// import About from "../pages/About";
// import { routesGenerator } from "../utils/routesGenerator";
// import { AdminSidebarPaths } from "./admin.routes";
// import { FacultyPaths } from "./faculty.routes";
// import { StudentPaths } from "./student.routes";
// // import Login from "../pages/Login";
import {ProtectedRoute} from "../private/ProtectedRoute";
import StudentHome from "../pages/dashboard/student/StudentHome";
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
      }
    ],
  },
  {
    path: "/",
    element:<DashboardLayout />,
    children: [
      {
        path: "/student/dashboard",
        element: <ProtectedRoute role="student"><StudentHome /></ProtectedRoute>,
      }
    ]

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
