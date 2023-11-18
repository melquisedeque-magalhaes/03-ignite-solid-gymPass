import { Gym, Prisma } from '@prisma/client'
import { GymsRepository, SearchManyNearbyProps } from '../gyms-repository'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/library'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async searchManyNearby({
    userLatitude,
    userLongitude,
  }: SearchManyNearbyProps) {
    return this.items.filter((gym) => {
      const MAX_DISTANCE_IN_KILOMETER = 10

      const distance = getDistanceBetweenCoordinates({
        from: { latitude: userLatitude, longitude: userLongitude },
        to: {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      })

      return distance <= MAX_DISTANCE_IN_KILOMETER
    })
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async searchMany(query: string, page: number) {
    const gyms = this.items
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)

    return gyms
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      phone: data.phone ?? null,
      description: data.description ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }
}
