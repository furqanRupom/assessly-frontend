// components/layout/StudentLayout.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, User, Zap } from 'lucide-react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';

interface StudentLayoutProps {
    children: React.ReactNode;
    user: {
        name: string;
        level: string;
        points: number;
    };
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({
    children,
    user,
    activeTab,
    setActiveTab
}) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center">
                        <div className="bg-white p-2 rounded-xl shadow-md">
                            <Zap className="h-8 w-8 text-indigo-600" />
                        </div>
                        <h1 className="text-2xl font-bold ml-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                            SkillQuest
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center bg-white py-1 px-3 rounded-full shadow-sm">
                            <div className="bg-indigo-100 p-1 rounded-full">
                                <User className="h-4 w-4 text-indigo-600" />
                            </div>
                            <span className="text-sm font-medium ml-2">{user.name}</span>
                        </div>
                        <button className="bg-white p-2 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <LogOut className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>
                </header>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar */}
                    <StudentSidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />

                    {/* Main Content */}
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default StudentLayout;