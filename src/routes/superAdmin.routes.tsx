import { Home } from "lucide-react";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
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
        name:"dashboard",
        path:"dashboard",
        icon:<Home size={18} />,
        element:<AdminDashboard />
    },
    {

    }
]