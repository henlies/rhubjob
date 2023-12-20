import { TypeInterface } from "./Type";

export interface GeneInterface {
    ID?: number;
    Name?: string;
    TypeID?: number;
    Type?: TypeInterface
}