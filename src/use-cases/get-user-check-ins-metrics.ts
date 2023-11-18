import { CheckInRepository } from '@/repositories/check-in-repository'

interface GetUserCheckInsMetricsUseCaseRequest {
  userId: string
}

interface GetUserCheckInsMetricsUseCaseResponse {
  countCheckIns: number
}

export class GetUserCheckInsMetricsUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
  }: GetUserCheckInsMetricsUseCaseRequest): Promise<GetUserCheckInsMetricsUseCaseResponse> {
    const countCheckIns = await this.checkInRepository.countByUserId(userId)

    return {
      countCheckIns,
    }
  }
}
