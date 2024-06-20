import { PostSInterface } from "./Post";

export interface NotifyInterface {
    ID?: number;
    Text?: string;
    Date: Date;
    Health?: string;
    Clean?: string;
    Post_ID?: number;
    Post?: PostSInterface;
}