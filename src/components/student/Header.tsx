import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Home,
    ClipboardCheck,
    History,
    User,
    Bell,
    LogOut,
    Settings,
    ChevronDown,
    Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/features/auth/authSlice';
import { useGetUserProfileQuery } from '@/redux/features/user/userApi';

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, isLoading } = useGetUserProfileQuery({});
    const profile = data?.data

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/student/dashboard' },
        { id: 'assessments', label: 'Assessments', icon: ClipboardCheck, path: 'student/assessments' },
        { id: 'history', label: 'History', icon: History, path: '/student/history' },
        { id: 'profile', label: 'Profile', icon: User, path: '/student/profile' },
    ];

    const isActive = (path: string) => location.pathname === path;

    // Skeleton component for profile
    const ProfileSkeleton = () => (
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="hidden md:block text-left">
                <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse mb-1"></div>
                <div className="h-3 w-16 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
            <div className="w-4 h-4 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
    );

    // Skeleton component for navigation items
    const NavItemSkeleton = () => (
        <div className="hidden md:flex items-center gap-6">
            {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex flex-col items-center px-1 py-2">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-200 rounded-md animate-pulse"></div>
                        <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <nav className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between py-3">
                    {/* Logo */}
                    <motion.div whileHover={{ scale: 1.01 }}>
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-white">
                                    <path fill="currentColor" d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm1.65-2.65L11.5 12.2V9h1v2.79l1.85 1.85-.7.71z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-primary-600 tracking-tight">Assessly</span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    {isLoading ? (
                        <NavItemSkeleton />
                    ) : (
                        <div className="hidden md:flex items-center gap-6">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.path);

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => navigate(item.path)}
                                        className="relative flex flex-col items-center cursor-pointer px-1 py-2 font-medium transition-colors"
                                    >
                                        <div className="flex items-center gap-2 text-gray-600 hover:text-primary-700">
                                            <Icon size={16} />
                                            <span>{item.label}</span>
                                        </div>
                                        {active && (
                                            <motion.div
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-t-full"
                                                layoutId="activeNavItem"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        {/* Notifications */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="relative rounded-xl">
                                    <Bell size={18} className="text-gray-600" />
                                    <Badge className="absolute -top-1 -right-1 px-1 py-0 min-w-0 w-4 h-4 flex items-center justify-center text-xs">
                                        3
                                    </Badge>
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="rounded-l-2xl mt-4 mr-4 h-[95vh]">
                                <SheetHeader className="text-left">
                                    <SheetTitle>Notifications</SheetTitle>
                                </SheetHeader>
                                <div className="mt-6 space-y-4">
                                    {[
                                        { title: 'New assessment available', desc: 'Mathematics Quiz #5', time: '5m ago' },
                                        { title: 'Grade updated', desc: 'Physics Assignment - 92%', time: '1h ago' },
                                        { title: 'Reminder', desc: 'Complete Chemistry lab report', time: '2h ago' },
                                    ].map((notif, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="p-3 bg-gray-50 rounded-xl"
                                        >
                                            <p className="font-semibold text-sm text-gray-900">{notif.title}</p>
                                            <p className="text-sm text-gray-600">{notif.desc}</p>
                                            <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* Profile Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                {isLoading ? (
                                    <ProfileSkeleton />
                                ) : (
                                    <Button variant="ghost" className="flex items-center gap-2 rounded-xl cursor-pointer">
                                        <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
                                            <span className="text-white font-semibold text-xs">{profile?.name?.slice(0, 2)}</span>
                                        </div>
                                        <div className="hidden md:block text-left">
                                            <p className="text-sm font-semibold text-gray-900">{profile?.name}</p>
                                            <p className="text-xs text-gray-500">{profile?.role}</p>
                                        </div>
                                        <ChevronDown size={16} className="text-gray-400" />
                                    </Button>
                                )}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl overflow-visible">
                                {isLoading ? (
                                    <div className="px-2 py-1.5 space-y-2">
                                        <div className="h-4 w-32 bg-gray-200 rounded-md animate-pulse"></div>
                                        <div className="h-3 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="px-2 py-1.5">
                                            <p className="font-semibold text-sm">{profile?.name}</p>
                                            <p className="text-xs text-gray-500">{profile?.email}</p>
                                        </div>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer rounded-lg">
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => dispatch(logout())} className="cursor-pointer rounded-lg">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Sign out</span>
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Mobile Navigation Trigger */}
                        <Sheet>
                            <SheetTrigger asChild className="md:hidden">
                                <Button variant="ghost" size="icon">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="rounded-r-2xl mt-4 ml-4 w-64">
                                <SheetHeader className="text-left mb-6">
                                    <motion.div whileHover={{ scale: 1.01 }}>
                                        <Link to="/" className="flex items-center space-x-2">
                                            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-white">
                                                    <path fill="currentColor" d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm1.65-2.65L11.5 12.2V9h1v2.79l1.85 1.85-.7.71z" />
                                                </svg>
                                            </div>
                                            <span className="text-2xl font-bold text-primary-600 tracking-tight">Assessly</span>
                                        </Link>
                                    </motion.div>
                                </SheetHeader>
                                <div className="space-y-2">
                                    {isLoading ? (
                                        // Mobile navigation skeleton
                                        <>
                                            {[1, 2, 3, 4].map((item) => (
                                                <div key={item} className="flex items-center gap-3 p-3 rounded-xl">
                                                    <div className="w-4 h-4 bg-gray-200 rounded-md animate-pulse"></div>
                                                    <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse"></div>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        navItems.map((item) => {
                                            const Icon = item.icon;
                                            const active = isActive(item.path);

                                            return (
                                                <motion.div
                                                    key={item.id}
                                                    className="relative"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <button
                                                        onClick={() => navigate(item.path)}
                                                        className="w-full flex items-center gap-3 p-3 rounded-xl cursor-pointer text-left transition-colors"
                                                    >
                                                        <Icon size={18} className={active ? "text-primary-600" : "text-gray-600"} />
                                                        <span className={active ? "font-semibold text-primary-600" : "text-gray-600"}>{item.label}</span>
                                                        {active && (
                                                            <motion.div
                                                                className="absolute left-0 top-0 bottom-0 w-1 bg-primary-600 rounded-r-full"
                                                                layoutId="mobileActiveNavItem"
                                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                            />
                                                        )}
                                                    </button>
                                                </motion.div>
                                            );
                                        })
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;