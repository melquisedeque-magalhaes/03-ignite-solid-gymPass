import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCretentials } from './errors/invalid-credentials-error'

let userRepository: InMemoryUserRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()

    authenticateUseCase = new AuthenticateUseCase(userRepository)
  })

  it('should be able to authenticate', async () => {
    userRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'john.doe@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      authenticateUseCase.execute({
        email: 'john.doe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCretentials)
  })

  it('should not be able to authenticate with wrong password', async () => {
    userRepository.create({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'john.doe@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCretentials)
  })
})
