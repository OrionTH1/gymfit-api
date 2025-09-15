import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'
import { GetAllGymsUseCase } from './get-all-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: GetAllGymsUseCase

describe('Get User Check Ins History Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new GetAllGymsUseCase(gymsRepository)
  })

  it("should be able to get all gyms", async () => {
    await gymsRepository.create({
      title: 'Gym 1',
      description: 'Gym 1 description',
      phone: '1234567890',
      latitude: -23.550520,
      longitude: -46.633308,
    })

    await gymsRepository.create({
      title: 'Gym 2',
      description: 'Gym 2 description',
      phone: '1234567890',
      latitude: -23.550520,
      longitude: -46.633308,
    })

    const { gyms } = await sut.execute({ query: "Gym", page: 1 });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym 1' }),
      expect.objectContaining({ title: 'Gym 2' })
    ])
  })

  it("should be able to get all gyms paginated", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym ${i}`,
        description: `Gym ${i} description`,
        phone: '1234567890',
        latitude: -23.550520,
        longitude: -46.633308,
      })
    }

    const { gyms } = await sut.execute({ query: "Gym", page: 2 });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym 21' }),
      expect.objectContaining({ title: 'Gym 22' })
    ])
  })
})
