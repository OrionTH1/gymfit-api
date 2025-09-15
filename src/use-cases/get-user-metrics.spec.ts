
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in.repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('Gym Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)

  })

  it("should be able to get check-ins count from metrics", async () => {
    await checkInsRepository.create({ user_id: "1", gym_id: "1" })
    await checkInsRepository.create({ user_id: "1", gym_id: "2" })

    const metrics = await sut.execute({ user_id: "1" })

    expect(metrics.total_check_ins).toEqual(2)
  })
})
