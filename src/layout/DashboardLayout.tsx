import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Topbar } from "../components/dashboard/Topbar";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardLayout = () => {
    const [isMobileSidebar, setIsMobileSidebar] = useState(false); // Mobile drawer

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar
            />

            {/* Main content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <Topbar onMenuClick={() => setIsMobileSidebar(true)} />

                <main className="flex-1 overflow-y-auto p-6 bg-white">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
