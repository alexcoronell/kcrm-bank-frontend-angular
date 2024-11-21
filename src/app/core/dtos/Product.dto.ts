import { Product } from '../models/Product.interface';

export interface CreateProductDto
  extends Omit<
    Product,
    'id' | 'createAt' | 'updateAt' | 'active' | 'deleted'
  > {}

export interface UpdateProductDto extends CreateProductDto {
  active: boolean;
}
