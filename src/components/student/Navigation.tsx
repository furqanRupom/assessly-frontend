import { useLocation, useNavigate } from "react-router-dom";
import {
    Home,
    ClipboardCheck,
    History,
    User,

} from 'lucide-react';
import type React from "react";

const Navigation: React.FunctionComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/student/dashboard' },
        { id: 'assessments', label: 'Assessments', icon: ClipboardCheck, path: 'student/assessments' },
        { id: 'history', label: 'History', icon: History, path: '/student/history' },
        { id: 'profile', label: 'Profile', icon: User, path: '/student/profile' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-center space-x-1 py-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);

                        return (
                            <button
                                key={item.id}
                                onClick={() => navigate(item.path)}
                                className={`relative flex items-center cursor-pointer gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${active
                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                <Icon size={18} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navigation