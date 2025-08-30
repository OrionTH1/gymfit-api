import { CheckIn, Prisma } from "generated/prisma";

export interface CheckInRepository {
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
