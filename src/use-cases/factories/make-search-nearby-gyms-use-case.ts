import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

import { SearchNearbyGymsUseCase } from '../search-nearby-gyms'

export function makeSearchNearByGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()

  const searchNearbyGymsUseCase = new SearchNearbyGymsUseCase(gymsRepository)

  return searchNearbyGymsUseCase
}
