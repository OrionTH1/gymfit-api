import { CheckIn, Prisma } from "generated/prisma";

export interface CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
