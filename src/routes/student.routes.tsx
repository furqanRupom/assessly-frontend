import { Home, Workflow } from "lucide-react";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import StudentHome from "../pages/dashboard/student/StudentHome";
import MyAssessments from "../pages/dashboard/student/assessments/MyAssessments";
/*
/admin-home
/add-supervisor
/admins
/users
/supervisors
/questions
/assessments
*/
export const StudentSidebarPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        icon: <Home size={18} />,
        element: <StudentHome />
    },
    {
      name:"My Assessments",
      path:"assessments",
      icon:<Workflow size={18} />,
      element:<MyAssessments />
    }
]