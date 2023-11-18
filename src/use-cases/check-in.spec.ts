import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCkeckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInRepository: InMemoryCkeckInRepository
let checkInUseCase: CheckInUseCase
let gymsRepository: InMemoryGymsRepository

describe('Check In Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCkeckInRepository()
    gymsRepository = new InMemoryGymsRepository()

    checkInUseCase = new CheckInUseCase(checkInRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-id',
      description: 'Javascript Gym',
      latitude: -15.7531375,
      longitude: -48.2891368,
      phone: '123456',
      title: 'Javascript Gym',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -15.7531375,
      userLongitude: -48.2891368,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await checkInUseCase.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -15.7531375,
      userLongitude: -48.2891368,
    })

    await expect(() =>
      checkInUseCase.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: -15.7531375,
        userLongitude: -48.2891368,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await checkInUseCase.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -15.7531375,
      userLongitude: -48.2891368,
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -15.7531375,
      userLongitude: -48.2891368,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in if distance gym', async () => {
    await gymsRepository.create({
      id: 'gym-id-1',
      description: 'Javascript Gym',
      latitude: -15.7173957,
      longitude: -48.23985,
      phone: '123456',
      title: 'Javascript Gym',
    })

    await expect(() =>
      checkInUseCase.execute({
        gymId: 'gym-id-1',
        userId: 'user-id',
        userLatitude: -15.7531375,
        userLongitude: -48.2891368,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
