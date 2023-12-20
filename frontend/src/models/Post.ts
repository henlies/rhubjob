import { StatusInterface } from "./Status";
import { UserInterface } from "./User";

export interface PostInterface {
    ID?: number;
    Descript?: string;
    Lati?: number;
    Long?: number;
    Start?: Date;
    End?: Date;
    Price?: number;
    User1ID?: number;
    User1?: UserInterface;
    User2ID?: number;
    User2?: UserInterface;
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
    User1ID?: number;
    User1?: UserInterface;
}