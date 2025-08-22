
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { useGetDailyUserRegistrationsQuery, useGetUserRegistrationStatsQuery, useGetUsersCountQuery } from "../../../redux/features/admin/adminApi";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

const SuperAdminDashboard = () => {
    // Fetch data using RTK Query hooks
    const { data: usersCount, isLoading: usersCountLoading } = useGetUsersCountQuery({});
    const { data: registrationStats, isLoading: statsLoading } = useGetUserRegistrationStatsQuery({});
    const { data: dailyRegistrations, isLoading: dailyLoading } = useGetDailyUserRegistrationsQuery(30);

    if (usersCountLoading || statsLoading || dailyLoading) {
        return (
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="animate-pulse">
                        <CardHeader>
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 bg-gray-200 rounded"></div>
                        </CardContent>
                    </Card>
                    <Card className="animate-pulse">
                        <CardHeader>
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 bg-gray-200 rounded"></div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

            {/* Users Count Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{usersCount?.students || 0}</div>
                        <p className="text-xs text-muted-foreground">Registered students</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Supervisors</CardTitle>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{usersCount?.supervisors || 0}</div>
                        <p className="text-xs text-muted-foreground">Registered supervisors</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{usersCount?.admins || 0}</div>
                        <p className="text-xs text-muted-foreground">Registered admins</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Registration Stats Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Registration Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={[
                                { period: 'Today', registrations: registrationStats?.today || 0 },
                                { period: 'This Week', registrations: registrationStats?.thisWeek || 0 },
                                { period: 'This Month', registrations: registrationStats?.thisMonth || 0 },
                                { period: 'Total', registrations: registrationStats?.total || 0 }
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="period" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="registrations" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Daily Registrations Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daily Registrations (Last 30 Days)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={dailyRegistrations}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;