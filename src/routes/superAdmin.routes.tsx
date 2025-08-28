import { BoxSelect, Home, Settings, SquarePercent, User2 } from "lucide-react";
import Admins from "../pages/dashboard/superAdmin/Admins";
import StudentManagement from "../pages/dashboard/superAdmin/Students";
import SupervisorManagement from "../pages/dashboard/superAdmin/Supervisors";
import SuperAdminDashboard from "../pages/dashboard/superAdmin/SuperAdminDashboard";
import ProfilePage from "@/pages/profile/Profile";
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
        element: <SuperAdminDashboard />
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

    },
    {
        name: "Settings",
        path:"settings",
        icon:<Settings size={18}/>,
        element:<ProfilePage />
    }
]