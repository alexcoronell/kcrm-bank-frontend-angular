import { Franchise } from './Franchise.interface';
import { Product } from './Product.interface';
import { User } from './User,interface';

export interface Sale {
  id: number;
  product: Product;
  franchise: Franchise | null;
  quotaRequested: number;
  rate: number | null;
  createAt: Date;
  updateAt: Date;
  createdBy: User;
  updatedBy: User;
  deleted: boolean;
}
