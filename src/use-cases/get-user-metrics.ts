import { CheckInRepository } from "@/repositories/check-in.repository";

type GetUserMetricsUseCaseRequest = {
  user_id: string;
}

interface GetUserMetricsUseCaseResponse {
  total_check_ins: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInRepository) { }

  async execute({ user_id }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const total = await this.checkInsRepository.countByUserId(user_id)

    return { total_check_ins: total }
  }
}
