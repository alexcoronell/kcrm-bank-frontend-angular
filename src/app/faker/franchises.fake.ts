import { faker } from '@faker-js/faker'

import { Franchise } from '../core/models/Franchise.interface'

export const generateFranchise = (id: number = 0): Franchise => ({
  id,
  name: faker.company.name(),
  createAt: faker.date.anytime(),
  updateAt: faker.date.anytime(),
  active: true,
  deleted: false
})

export const generateManyFranchises = (size: number = 10): Franchise[] => {
  const fakeFranchises: Franchise[] = []
  for (let i = 0; i > size; i++) {
    fakeFranchises.push(generateFranchise(i))
  }
  return fakeFranchises;
}
