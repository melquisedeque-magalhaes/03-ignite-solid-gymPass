import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCkeckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInRepository: InMemoryCkeckInRepository
let fetchUserCheckInsHistoryUseCase: FetchUserCheckInsHistoryUseCase

describe('Fetch user check-ins history Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCkeckInRepository()

    fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(
      checkInRepository,
    )
  })

  it('should be able to fetch check in history', async () => {
    await checkInRepository.create({
      gym_id: `gym-id-01`,
      user_id: 'user-id-01',
    })

    await checkInRepository.create({
      gym_id: `gym-id-02`,
      user_id: 'user-id-01',
    })

    const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
      userId: 'user-id-01',
      page: 1,
    })

    expect(checkIns.length).toEqual(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id-01' }),
      expect.objectContaining({ gym_id: 'gym-id-02' }),
    ])
  })

  it('should be able to fetch paginated check in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `gym-id-${i}`,
        user_id: 'user-id-01',
      })
    }

    const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
      userId: 'user-id-01',
      page: 2,
    })

    expect(checkIns.length).toEqual(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id-21' }),
      expect.objectContaining({ gym_id: 'gym-id-22' }),
    ])
  })
})
