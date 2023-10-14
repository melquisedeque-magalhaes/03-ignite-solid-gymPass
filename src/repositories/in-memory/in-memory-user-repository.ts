import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../user-repository'

export class InMemoryUserRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'test-id',
      email: data.email,
      name: data.name,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
