import { Gym, Prisma } from "generated/prisma";

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(gym: Prisma.GymCreateInput): Promise<Gym>
  findManyByQuery(query: string, page: number): Promise<Gym[]>
}
