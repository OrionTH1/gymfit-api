import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in.repository'
import { GetUserCheckInsHistoryUseCase } from './get-user-check-ins-history'

let checkInsRepository: InMemoryCheckInRepository
let sut: GetUserCheckInsHistoryUseCase

describe('Get User Check Ins History Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository()
    sut = new GetUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it("should be able to get user check ins history", async () => {
    await checkInsRepository.create({
      gym_id: '1',
      user_id: '1',
    })

    await checkInsRepository.create({
      gym_id: '2',
      user_id: '1',
    })

    const { checkIns } = await sut.execute({ user_id: '1', page: 1 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: '1' }),
      expect.objectContaining({ gym_id: '2' })
    ])
  })

  it("should be able to get user check ins history paginated", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `${i}`,
        user_id: '1',
      })
    }

    const { checkIns } = await sut.execute({ user_id: '1', page: 2 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: '21' }),
      expect.objectContaining({ gym_id: '22' })
    ])
  })
})
