import { CheckIn, Prisma } from "generated/prisma";
import { randomUUID } from "node:crypto";
import { CheckInRepository } from "../check-in.repository";

export class InMemoryCheckInRepository implements CheckInRepository {
  private items: CheckIn[] = []

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
