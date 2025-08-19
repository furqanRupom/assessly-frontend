import { useState, useRef, useEffect } from "react";
import { Search, Bell, HelpCircle, Menu, LogOut, User, Settings, ChevronDown } from "lucide-react";
import { useGetUserProfileQuery } from "../../redux/features/user/userApi";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";

export const Topbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const { data, isLoading } = useGetUserProfileQuery({});
    const dispatch = useDispatch()
    const user = data.data

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (isLoading) {
        return (
            <header className="sticky top-0 z-30 bg-white border-b border-primary-100 shadow-sm">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <button className="p-2 rounded-lg text-primary-600 hover:bg-primary-100 lg:hidden">
                            <Menu size={22} />
                        </button>
                        <div className="w-64 h-10 bg-primary-100 rounded-lg animate-pulse hidden sm:block"></div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="w-9 h-9 bg-primary-200 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </header>
        );
    }

    if (!user) return <Navigate to="/login" replace />;

    const getUserInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const formatRole = (role: string) => {
        return role.charAt(0).toUpperCase() + role.slice(1);
    };

    return (
        <header className="sticky top-0 z-30 bg-white border-b border-primary-100 shadow-sm">
            <div className="flex items-center justify-between px-4 py-3">
                {/* Left: Menu + Search */}
                <div className="flex items-center gap-3">
                    <button
                        className="p-2 rounded-lg text-primary-600 hover:bg-primary-100 transition-colors lg:hidden"
                        onClick={onMenuClick}
                    >
                        <Menu size={22} />
                    </button>

                    {/* Search */}
                    <div className="relative hidden sm:block">
                        <Search
                            size={18}
                            className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? "text-primary-600" : "text-primary-400"
                                }`}
                        />
                        <input
                            type="text"
                            placeholder="Search courses, assignments..."
                            className="w-64 pl-10 pr-4 py-2 text-sm rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all duration-200"
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                        />
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center space-x-3">
                    {/* Notification Bell */}
                    <button className="p-2 rounded-full text-primary-600 hover:bg-primary-100 relative transition-colors group">
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-accent-500 rounded-full"></span>
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    </button>

                    {/* Help Center */}
                    <button className="p-2 rounded-full text-primary-600 hover:bg-primary-100 transition-colors">
                        <HelpCircle size={20} />
                    </button>

                    {/* User Profile */}
                    <div className="relative" ref={profileRef}>
                        <button
                            className="flex items-center space-x-2 p-1 rounded-lg hover:bg-primary-50 transition-colors"
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                        >
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full cursor-pointer bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-medium text-sm">
                                    {getUserInitials(user.name)}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>

                            <div className="hidden md:block text-left cursor-pointer">
                                <p className="text-sm font-medium text-primary-800 truncate max-w-[120px]">
                                    {user.name.split(' ')[0]}
                                </p>
                                <p className="text-xs text-primary-500">
                                    {formatRole(user.role)}
                                </p>
                            </div>

                            <ChevronDown
                                size={16}
                                className={`text-primary-500 transition-transform ${isProfileOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {/* Profile Dropdown */}
                        {isProfileOpen && (
                            <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-primary-100 py-1 z-40">
                                <div className="px-4 py-2 border-b border-primary-100">
                                    <p className="text-sm font-medium text-primary-800 truncate">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-primary-500">
                                        {user.email}
                                    </p>
                                </div>

                                <button className="w-full cursor-pointer flex items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors">
                                    <User size={16} className="mr-3" />
                                    Profile
                                </button>

                                <button className="w-full flex cursor-pointer items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 transition-colors">
                                    <Settings size={16} className="mr-3" />
                                    Settings
                                </button>

                                <div className="border-t border-primary-100 my-1"></div>

                                <button onClick={()=> dispatch(logout())} className="w-full flex cursor-pointer items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                    <LogOut size={16} className="mr-3" />
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};