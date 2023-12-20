import { MethodInterface } from "./Method";
import { PostInterface } from "./Post";

export interface PaymentInterface {
    ID?: number;
    Time?: Date;
    Status?: number;
    MethodID?: number;
    Method?: MethodInterface;
    PostID?: number;
    Post?: PostInterface;
}