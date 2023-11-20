import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'

import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInRepository = new PrismaCheckInRepository()

  const fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(
    checkInRepository,
  )

  return fetchUserCheckInsHistoryUseCase
}
