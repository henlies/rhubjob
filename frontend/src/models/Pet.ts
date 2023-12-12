import { GeneInterface } from "./Gene";
import { TypeInterface } from "./Type";

export interface PetInterface {
    ID: number;
    TypeID: number;
    Type: TypeInterface
    GeneID: number;
    Gene: GeneInterface
    Food: string;
    Habit: string;
    Descript: string;
    Pill: string;
    Pic: string;
}