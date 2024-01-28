import { StatusInterface } from "./Status";
import { TypeInterface } from "./Type";
import { ServiceProviderInterface, ServiceUserInterface } from "./User";

// Show Post
export interface PostSInterface {
    ID?: number;
    Descript?: string;
    Start: Date;
    End: Date;
    Price?: number;
    TypeID?: number;
    Type?: TypeInterface;
    Service_UserID?: number
    ServiceUser: ServiceUserInterface;
    Service_ProviderID?: number;
    ServiceProvider?: ServiceProviderInterface;
    StatusID?: number;
    Status?: StatusInterface;
    Note?: string;
}

// Create Post
export interface PostCInterface {
    ID?: number;
    Descript?: string;
    Start?: Date;
    End?: Date;
    Price?: number;
    TypeID?: number;
    Service_ProviderID?: number;
    StatusID?: number;
}

// Edit Post
export interface PostEInterface {
    ID?: number;
    Descript?: string;
    Start?: Date;
    End?: Date;
    Price?: number;
    TypeID?: number;
    Note?: string;
    Service_UserID?: number;
}