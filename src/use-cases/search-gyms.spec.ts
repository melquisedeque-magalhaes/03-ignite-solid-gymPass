import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let searchGymsUseCase: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()

    searchGymsUseCase = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search gym', async () => {
    await gymsRepository.create({
      id: 'gym-id-1',
      description: 'Javascript Gym',
      latitude: -15.7173957,
      longitude: -48.23985,
      phone: '123456',
      title: 'Javascript Gym',
    })

    await gymsRepository.create({
      id: 'gym-id-2',
      description: 'Typescript Gym',
      latitude: -15.7173957,
      longitude: -48.23985,
      phone: '123456',
      title: 'Typescript Gym',
    })

    const { gyms } = await searchGymsUseCase.execute({
      query: 'Javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript Gym' })])
  })

  it('should be able to fetch paginated check in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: 'gym-id-1',
        description: 'Javascript Gym',
        latitude: -15.7173957,
        longitude: -48.23985,
        phone: '123456',
        title: `Javascript Gym ${i}`,
      })
    }

    const { gyms } = await searchGymsUseCase.execute({
      query: 'Javascript',
      page: 2,
    })

    expect(gyms.length).toEqual(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym 21' }),
      expect.objectContaining({ title: 'Javascript Gym 22' }),
    ])
  })
})
