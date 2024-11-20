import { Base } from "./Base.interface";

export interface Product extends Base {
  rateRequired: boolean;
  franchiseRequired: boolean;
}
