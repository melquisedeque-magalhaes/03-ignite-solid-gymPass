import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { UserAlrealdyExists } from './errors/user-alrealdy-exists-error'

let userRepository: InMemoryUserRepository
let registerUseCase: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()

    registerUseCase = new RegisterUseCase(userRepository)
  })

  it('should be able to register', async () => {
    const { user } = await registerUseCase.execute({
      email: 'john.doe@email.com',
      name: 'John Doe',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const password = '123456'

    const { user } = await registerUseCase.execute({
      email: 'john.doe@email.com',
      name: 'John Doe',
      password,
    })

    const isPasswordHashed = await compare(password, user.password_hash)

    expect(isPasswordHashed).toBeTruthy()
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'john.doe@email.com'

    await registerUseCase.execute({
      email,
      name: 'John Doe',
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        email,
        name: 'John Doe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlrealdyExists)
  })
})
