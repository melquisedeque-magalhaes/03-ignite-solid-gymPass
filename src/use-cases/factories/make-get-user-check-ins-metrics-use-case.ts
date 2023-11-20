import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'

import { GetUserCheckInsMetricsUseCase } from '../get-user-check-ins-metrics'

export function makeGetUserCheckInsMetricsUseCase() {
  const checkInRepository = new PrismaCheckInRepository()

  const getUserCheckInsMetricsUseCase = new GetUserCheckInsMetricsUseCase(
    checkInRepository,
  )

  return getUserCheckInsMetricsUseCase
}
