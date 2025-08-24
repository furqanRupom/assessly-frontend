// components/layout/StudentSidebar.tsx
import React from 'react';
import { BarChart3, Play, Award, User, Trophy, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StudentSidebarProps {
    user: {
        level: string;
        points: number;
    };
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const StudentSidebar: React.FC<StudentSidebarProps> = ({ user, activeTab, setActiveTab }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'assessments', label: 'Assessments', icon: Play },
        { id: 'results', label: 'Results', icon: Award },
        { id: 'profile', label: 'Profile', icon: User },
    ];

    return (
        <aside className="md:w-64 bg-white rounded-2xl shadow-md p-4 h-fit sticky top-6">
            <nav className="space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "w-full flex items-center px-4 py-3 rounded-xl text-left transition-colors",
                                activeTab === item.id
                                    ? "bg-indigo-100 text-indigo-700 font-medium"
                                    : "text-gray-600 hover:bg-gray-100"
                            )}
                        >
                            <Icon className="h-5 w-5 mr-3" />
                            {item.label}
                            {activeTab === item.id && (
                                <ChevronRight className="h-4 w-4 ml-auto" />
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="mt-8 p-4 bg-indigo-50 rounded-xl">
                <h3 className="font-medium text-indigo-800 mb-2">Your Level</h3>
                <div className="flex items-center">
                    <div className="bg-white p-2 rounded-full">
                        <Trophy className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium">{user.level}</p>
                        <p className="text-xs text-indigo-600">{user.points} XP</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default StudentSidebar;