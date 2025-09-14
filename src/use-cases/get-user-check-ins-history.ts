import { CheckIn } from "generated/prisma";
import { CheckInRepository } from "@/repositories/check-in.repository";

type GetUserCheckInsHistoryUseCaseRequest = {
  user_id: string;
  page: number;
}

interface GetUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class GetUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInRepository) { }

  async execute({ user_id, page }: GetUserCheckInsHistoryUseCaseRequest): Promise<GetUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(user_id, page)

    return { checkIns }
  }
}
