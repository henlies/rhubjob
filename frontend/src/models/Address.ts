import { ProvinceInterface } from "./Province";

export interface AddressInterface {
    ID?: number;
    ProvinceID?: number;
    Province?: ProvinceInterface
    DistrictID?: number;
    District?: string;
    Descript?: string;
}