import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCkeckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { GetUserCheckInsMetricsUseCase } from './get-user-check-ins-metrics'

let checkInRepository: InMemoryCkeckInRepository
let getUserCheckInsMetricsUseCase: GetUserCheckInsMetricsUseCase

describe('Get user check-ins metrics Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCkeckInRepository()

    getUserCheckInsMetricsUseCase = new GetUserCheckInsMetricsUseCase(
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

    const { countCheckIns } = await getUserCheckInsMetricsUseCase.execute({
      userId: 'user-id-01',
    })

    expect(countCheckIns).toEqual(2)
  })
})
