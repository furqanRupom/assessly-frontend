import { NavLink } from "react-router-dom";
import type { IAdminSidebarRoutes, IRoutePath } from "../interfaces/routes.interface";

export const sidebarGenerator = (items: IRoutePath[], role: string) => {
    const navLinkPaths = items.reduce((acc: IAdminSidebarRoutes[], item) => {
        // Handle direct paths
        if (item.path && item.element) {
            acc.push({
                key: item.name,
                label: (
                    <NavLink
                        to={`/${role}/${item.path}`}
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md transition-colors ${isActive
                                ? "bg-primary-100 text-primary-700 font-medium"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`
                        }
                    >
                        {item.icon && <span className="mr-2 inline-flex">{item.icon}</span>}
                        {item.name}
                    </NavLink>
                ),
            });
        }

        // Handle children (nested routes)
        if (item.children && item.name) {
            acc.push({
                key: item.name,
                label: item.name,
                children: item.children
                    .filter((child) => child.name && child.path)
                    .map((child) => ({
                        key: child.name!,
                        label: (
                            <NavLink
                                to={`/${role}/${child.path}`}
                                className={({ isActive }) =>
                                    `block px-3 py-2 rounded-md transition-colors ${isActive
                                        ? "bg-primary-100 text-primary-700 font-medium"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }`
                                }
                            >
                                {child.name}
                            </NavLink>
                        ),
                    })),
            });
        }

        return acc;
    }, []);

    return navLinkPaths;
};
