import { Franchise } from '../models/Franchise.interface';

export interface CreateFranchiseDto
  extends Omit<
    Franchise,
    'id' | 'createAt' | 'updateAt' | 'active' | 'deleted'
  > {}

export interface UpdateFracchiseDto extends CreateFranchiseDto {
  active: boolean;
}
