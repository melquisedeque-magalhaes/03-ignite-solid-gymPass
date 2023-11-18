import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface SearchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface SearchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchNearbyGymsUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: SearchNearbyGymsUseCaseRequest): Promise<SearchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymRepository.searchManyNearby({
      userLatitude,
      userLongitude,
    })

    return {
      gyms,
    }
  }
}
