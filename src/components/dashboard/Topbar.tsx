import { Search, Bell, HelpCircle, Menu } from "lucide-react";

export const Topbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
    return (
        <header className="sticky top-0 z-20 bg-white border-b border-primary-100">
            <div className="flex items-center justify-between px-4 py-3">
                {/* Left: Menu + Search */}
                <div className="flex items-center gap-3">
                    <button
                        className="p-2 rounded-lg text-primary-600 hover:bg-primary-100 lg:hidden"
                        onClick={onMenuClick}
                    >
                        <Menu size={22} />
                    </button>

                    {/* Search */}
                    <div className="relative hidden sm:block">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400"
                        />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-64 pl-10 pr-4 py-2 text-sm rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                        />
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full text-primary-600 hover:bg-primary-100 relative">
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-accent-500 rounded-full"></span>
                    </button>

                    <button className="p-2 rounded-full text-primary-600 hover:bg-primary-100">
                        <HelpCircle size={20} />
                    </button>

                    <div className="flex items-center space-x-2">
                        <div className="w-9 h-9 rounded-full bg-primary-300"></div>
                        <span className="hidden md:inline text-sm font-medium text-primary-800">
                            John Doe
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};
