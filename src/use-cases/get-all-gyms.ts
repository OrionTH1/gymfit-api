
import { Gym } from "generated/prisma";
import { GymsRepository } from "@/repositories/gyms.repository";

type GetAllGymsRequest = {
  query: string;
  page: number;
}

interface GetAllGymsResponse {
  gyms: Gym[]
}

export class GetAllGymsUseCase {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({ query, page }: GetAllGymsRequest): Promise<GetAllGymsResponse> {
    const gyms = await this.gymsRepository.findManyByQuery(query, page)

    return { gyms }
  }
}
