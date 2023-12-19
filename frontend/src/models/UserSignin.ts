import { RoleInterface } from "./Role";

export interface UserSigninUseInterface {
    ID?: number;
    User?: string;
    Pass?: string;
    RoleID?: number;
    Role?: RoleInterface;
}

export interface UserSigninJobInterface {
    ID?: number;
    PersonalID?: number;
    Firstname?: string;
    Lastname?: string;
    User?: string;
    Pass?: string;
    RoleID?: number;
    Role?: RoleInterface;
    Email?: string;
    Phone?: string;
}