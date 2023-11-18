import { Prisma, CheckIn } from '@prisma/client'

export interface CheckInRepository {
  findById(id: string): Promise<CheckIn | null>
  save(checkIn: CheckIn): Promise<CheckIn>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserToCheckInSameDay(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null>
  countByUserId(userId: string): Promise<number>
}
