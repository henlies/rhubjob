import { ProvinceInterface } from "./Province";

export interface DistrictInterface {
    ID: number;
    Name: string;
    Zipcode: string;
    ProvinceID: number;
    Province: ProvinceInterface;
}