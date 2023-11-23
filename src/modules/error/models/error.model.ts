export interface RouteData {
    title?: string;
    activeTopNav?: string;
    breadcrumbs?: Breadcrumb[];
}
export interface Breadcrumb {
    text: string;
    link?: string;
    active?: boolean;
}