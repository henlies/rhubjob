import { StatusInterface } from "./Status";
import { TypeInterface } from "./Type";
import { ServiceProviderInterface, ServiceUserInterface } from "./User";

export interface PostInterface {
    ID?: number;
    Descript?: string;
    Lati?: number;
    Long?: number;
    Start?: Date;
    End?: Date;
    Price?: number;
    StatusID?: number;
    Status?: StatusInterface;
}

export interface PostsInterface {
    ID?: number;
    Descript?: string;
    Lati?: number;
    Long?: number;
    Start?: Date;
    End?: Date;
    Price?: number;
}

export interface PosteInterface {
    ID?: number;
    Descript?: string;
    Lati?: number;
    Long?: number;
    Start?: Date;
    End?: Date;
    Price?: number;
}

// export interface PostaInterface {
//     ID?: number;
//     User2ID?: number;
//     User2?: UserInterface;
// }

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
    Service_User?: ServiceUserInterface;
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
}

// Chart Post
export interface PostChartInterface {
    status: string;
    value: string;
}