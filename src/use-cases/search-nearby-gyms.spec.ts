import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchNearbyGymsUseCase } from './search-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let searchNearbyGymsUseCase: SearchNearbyGymsUseCase

describe('Search Nearby Gym Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()

    searchNearbyGymsUseCase = new SearchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to search nearby gyms', async () => {
    await gymsRepository.create({
      id: 'Near Gym',
      description: 'Near Gym',
      latitude: -15.7531375,
      longitude: -48.2891368,
      phone: '123456',
      title: 'Near Gym',
    })

    await gymsRepository.create({
      id: 'Far Gym',
      description: 'Far Gym',
      latitude: -15.6968331,
      longitude: -48.196268,
      phone: '123456',
      title: 'Far Gym',
    })

    const { gyms } = await searchNearbyGymsUseCase.execute({
      userLatitude: -15.7531375,
      userLongitude: -48.2891368,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
