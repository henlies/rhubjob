import { DistrictInterface } from "./District";
import { ProvinceInterface } from "./Province";

export interface AddressInterface {
    ID?: number;
    Descript?: string;
    ProvinceID?: number;
    Province?: ProvinceInterface
    DistrictID?: number;
    District?: DistrictInterface;
}