import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'
import { CreateGymUseCase } from './create-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)

  })

  it("should be able to create", async () => {
    const { gym } = await sut.execute({
      title: 'Gym 01',
      description: 'Gym 01',
      phone: '123456789',
      latitude: -22.7215197,
      longitude: -43.3584274
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
