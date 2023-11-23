export interface SideNavItem {
    icon?: string;
    text: string;
    link?: string;
    AddLink?: string;
    submenu?: SideNavItem[];
    new?: boolean;
    updated?: boolean;
}
export interface SideNavItems {
    [index: string]: SideNavItem;
}

export interface SideNavSection {
    text?: string;
    items: string[];
}