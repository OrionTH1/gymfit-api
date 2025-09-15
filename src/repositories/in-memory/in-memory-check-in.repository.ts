import { CheckIn, Prisma } from "generated/prisma";
import { randomUUID } from "node:crypto";
import { CheckInRepository } from "../check-in.repository";
import dayjs from "dayjs";

export class InMemoryCheckInRepository implements CheckInRepository {
  private items: CheckIn[] = []

  async countByUserId(userId: string): Promise<number> {
    return this.items.filter((checkIn) => checkIn.user_id === userId).length
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const limit = 20

    return this.items.filter((checkIn) => checkIn.user_id === userId).slice((page - 1) * limit, page * limit)
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const checkInOnSameDate = this.items.find((checkIn) => {
      return checkIn.user_id == userId && dayjs(checkIn.created_at).startOf('day').isSame(dayjs(date).startOf('day'))
    })

    if (!checkInOnSameDate) return null

    return checkInOnSameDate
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const user = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }

    this.items.push(user)

    return user
  }

}
