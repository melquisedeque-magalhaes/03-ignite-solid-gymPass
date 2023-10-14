import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let userRepository: InMemoryUserRepository
let getUserProfileUseCase: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()

    getUserProfileUseCase = new GetUserProfileUseCase(userRepository)
  })

  it('should be able to get user profile', async () => {
    const createUser = await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await getUserProfileUseCase.execute({
      userId: createUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      getUserProfileUseCase.execute({
        userId: 'user-id-not-exists',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
