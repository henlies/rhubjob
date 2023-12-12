import { UserInterface } from "./User";

export interface CommentInterface {
    ID: number;
    Descript: string;
    Score: number;
}

export interface UserCommentInterface {
    ID: number;
    User1ID: number;
    User1: UserInterface;
    User2ID: number;
    User2: UserInterface;
    CommentID: number;
    Comment: CommentInterface
}