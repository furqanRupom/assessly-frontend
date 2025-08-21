import { BoxSelect, Home, SquarePercent, User2, UserCircle } from "lucide-react";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import Admins from "../pages/dashboard/superAdmin/Admins";
import StudentManagement from "../pages/dashboard/superAdmin/Students";
import SupervisorManagement from "../pages/dashboard/superAdmin/Supervisors";
/*
/admin-home
/add-supervisor
/admins
/add-admins
/users
/supervisors
/questions
/assessments
*/
export const SuperAdminSidebarPaths = [
    {
        name: "dashboard",
        path: "dashboard",
        icon: <Home size={18} />,
        element: <AdminDashboard />
    },
    {
        name: "All admins",
        path: "admins",
        icon: <BoxSelect size={18} />,
        element: <Admins />

    },
    {
        name: "All students",
        path: "students",
        icon: <User2 size={18} />,
        element: <StudentManagement />

    },
    {
        name: "All supervisors",
        path: "supervisors",
        icon: <SquarePercent size={18} />,
        element: <SupervisorManagement />

    }
]