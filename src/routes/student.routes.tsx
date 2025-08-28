import { History, Home, User, Workflow } from "lucide-react";
import StudentHome from "../pages/dashboard/student/StudentHome";
import Assessment from "@/pages/Assessment/Assessment";
import ProfilePage from "@/pages/profile/Profile";
import MyAssessments from "@/pages/dashboard/student/assessments/MyAssessments";

export const StudentSidebarPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <Home size={18} />,
    element: <StudentHome />
  },
  {
    name: "Assessments",
    path: "assessments",
    icon: <Workflow size={18} />,
    element: <Assessment />
  },
  {
    name: "History",
    path: "history",
    icon: <History size={19} />,
    element: <MyAssessments />
  },
  {
    name: "Profile",
    path: "profile",
    icon: <User size={19} />,
    element: <ProfilePage />
  }
]