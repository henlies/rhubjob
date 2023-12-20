import { UserInterface } from "./User";

export interface ChatInterface {
    ID?: number;
    Message1?: string;
    Message2?: string;
}

export interface UserChatInterface {
    ID?: number;
    User1ID?: number;
    User1?: UserInterface;
    User2ID?: number;
    User2?: UserInterface;
    ChatID?: number;
    Chat?: ChatInterface;
}