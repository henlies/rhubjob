export interface SigninInterface {
    User?: string;
    Pass?: string;
}

export interface SidebarProps {
    isAdmin: boolean;
    per: string;
}

export interface MenuItem {
    key: string;
    icon: React.ReactNode;
    label: string;
    link: string;
}