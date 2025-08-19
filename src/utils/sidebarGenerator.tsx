import type { JSX } from "react";
import type { IRoutePath } from "../interfaces/routes.interface";
import { Home } from "lucide-react";

export interface INavItem {
    to: string;
    icon?: JSX.Element;
    label: string;
}

export const sidebarGenerator = (items: IRoutePath[], role: string): INavItem[] => {
    const navItems: INavItem[] = [];

    items.forEach((item) => {
        // Only generate if path exists
        if (item.path && item.name) {
            navItems.push({
                to: `/${role}/${item.path}`,
                icon: item.icon || <Home size={18} />,
                label: item.name,
            });
        }

        // Handle children
        if (item.children && item.children.length > 0) {
            item.children.forEach((child) => {
                if (child.path && child.name) {
                    navItems.push({
                        to: `/${role}/${child.path}`,
                        label: child.name,
                    });
                }
            });
        }
    });

    return navItems;
};
