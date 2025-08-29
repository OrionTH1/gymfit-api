import { CheckInRepository } from "@/repositories/check-in.repository";
import { CheckIn } from "generated/prisma";

type CheckInUseCaseRequest = {
  userId: string
  gymId: string
}

type CheckInUseCaseResponse = {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) { }

  async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId
    })

    return { checkIn }
  }
}
