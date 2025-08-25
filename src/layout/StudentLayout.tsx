import Header from '@/components/student/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const StudentDashboardLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <Header />
            <main className="max-w-7xl mx-auto px-6 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default StudentDashboardLayout;
