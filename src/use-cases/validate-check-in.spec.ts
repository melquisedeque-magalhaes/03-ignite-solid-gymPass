import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCkeckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LaterCheckInValidationError } from './errors/later-check-in-validation-error'

let checkInRepository: InMemoryCkeckInRepository
let validateCheckInUseCase: ValidateCheckInUseCase

describe('Validate Check In Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCkeckInRepository()

    validateCheckInUseCase = new ValidateCheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate check in', async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-id-01',
      user_id: 'user-id-01',
    })

    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate inexistent check in', async () => {
    expect(
      validateCheckInUseCase.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate check in after 20 minutes from created', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 14, 40))

    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-id-01',
      user_id: 'user-id-01',
    })

    const TWENTY_ONE_MINUTES_IN_MS = 1000 * 60 * 21

    vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_MS)

    expect(
      validateCheckInUseCase.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LaterCheckInValidationError)
  })
})
