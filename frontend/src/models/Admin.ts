import { BloodInterface } from "./Blood";
import { GenderInterface } from "./Gender";
import { PerInterface } from "./Per";
import { PrefixInterface } from "./Prefix";
import { RoleInterface } from "./Role";

export interface AdminInterface {
    ID?: number;
    PrefixID?: number;
    Prefix?: PrefixInterface;
    Firstname: string;
    Lastname: string;
    Nickname: string;
    GenderID?: number;
    Gender?: GenderInterface;
    Phone: string;
    Email: string;
    BloodID?: number;
    Blood?: BloodInterface;
    PerID?: number;
    Per?: PerInterface;
    Pic: string;
    User: string;
    Pass: string;
    RoleID?: number;
    Role?: RoleInterface;
    Status: number;
}