import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymsRepository
let createGymUseCase: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()

    createGymUseCase = new CreateGymUseCase(gymRepository)
  })

  it('should be able to register', async () => {
    const { gym } = await createGymUseCase.execute({
      description: 'Javascript Gym',
      latitude: -15.7531375,
      longitude: -48.2891368,
      phone: '123456',
      title: 'Javascript Gym',
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
