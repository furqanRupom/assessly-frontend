import { useState } from "react";
import { motion } from "framer-motion";
import {
    Home,
    BookOpen,
    BarChart2,
    Award,
    CheckCircle,
    Settings,
    Users,
    FileText,
    ChevronLeft,
    ChevronRight,
    PlusCircle
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();

    const navItems = [
        { to: "/", icon: <Home size={18} />, label: "Dashboard" },
        { to: "/projects", icon: <BookOpen size={18} />, label: "Projects" },
        { to: "/analytics", icon: <BarChart2 size={18} />, label: "Analytics" },
        { to: "/team", icon: <Users size={18} />, label: "Team" },
        { to: "/tasks", icon: <CheckCircle size={18} />, label: "Tasks" },
        { to: "/documents", icon: <FileText size={18} />, label: "Documents" },
        { to: "/rewards", icon: <Award size={18} />, label: "Rewards" },
    ];

    const secondaryItems = [
        { to: "/settings", icon: <Settings size={18} />, label: "Settings" }
    ];

    return (
        <motion.aside
            animate={{ width: isOpen ? 220 : 64 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="h-screen bg-primary-900 text-secondary-100 flex flex-col border-r border-primary-700"
        >
            {/* Logo Section */}
            <div className="flex items-center justify-between p-4 h-16 border-b border-primary-700">
                <Link to="/" className="flex items-center space-x-2 min-w-max">
                    <div className="w-8 h-8 rounded bg-primary-600 flex items-center justify-center shrink-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-4 h-4 text-white"
                        >
                            <path
                                fill="currentColor"
                                d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm1.65-2.65L11.5 12.2V9h1v2.79l1.85 1.85-.7.71z"
                            />
                        </svg>
                    </div>
                    {isOpen && (
                        <span className="text-lg font-medium text-white tracking-tight whitespace-nowrap">
                            Assessly
                        </span>
                    )}
                </Link>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 overflow-y-auto py-2 px-2">
                {isOpen && (
                    <div className="px-2 py-3 mb-2 text-xs font-medium text-primary-300 uppercase tracking-wider">
                        Navigation
                    </div>
                )}

                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <Link
                                to={item.to}
                                className={`flex items-center gap-3 p-2 rounded-md text-sm transition-colors
                  ${location.pathname === item.to
                                        ? "bg-primary-700 text-white font-medium"
                                        : "text-primary-200 hover:bg-primary-800 hover:text-white"}
                  ${isOpen ? "pl-3" : "justify-center"}`}
                            >
                                <span className={`${location.pathname === item.to ? "text-white" : "text-primary-300"}`}>
                                    {item.icon}
                                </span>
                                {isOpen && (
                                    <span className="whitespace-nowrap transition-opacity duration-100">
                                        {item.label}
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>

                {isOpen && (
                    <div className="px-2 py-3 mt-4 mb-2 text-xs font-medium text-primary-300 uppercase tracking-wider border-t border-primary-700">
                        Other
                    </div>
                )}

                <ul className="space-y-1">
                    {secondaryItems.map((item) => (
                        <li key={item.to}>
                            <Link
                                to={item.to}
                                className={`flex items-center gap-3 p-2 rounded-md text-sm transition-colors
                  ${location.pathname === item.to
                                        ? "bg-primary-700 text-white font-medium"
                                        : "text-primary-200 hover:bg-primary-800 hover:text-white"}
                  ${isOpen ? "pl-3" : "justify-center"}`}
                            >
                                <span className={`${location.pathname === item.to ? "text-white" : "text-primary-300"}`}>
                                    {item.icon}
                                </span>
                                {isOpen && (
                                    <span className="whitespace-nowrap transition-opacity duration-100">
                                        {item.label}
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Bottom Section */}
            <div className="p-3 border-t border-primary-700">
                {isOpen ? (
                    <button className="w-full flex items-center justify-center gap-2 p-2 bg-primary-600 hover:bg-primary-500 text-white rounded-md text-sm font-medium transition-colors">
                        <PlusCircle size={16} />
                        <span>New Project</span>
                    </button>
                ) : (
                    <button className="w-full flex items-center justify-center p-2 bg-primary-600 hover:bg-primary-500 text-white rounded-md transition-colors">
                        <PlusCircle size={16} />
                    </button>
                )}

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full mt-2 flex items-center justify-center p-2 rounded-md text-primary-200 hover:bg-primary-800 hover:text-white transition-colors"
                >
                    {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                </button>
            </div>
        </motion.aside>
    );
}