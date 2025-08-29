import { InMemoryCheckInRepository } from '@/repositories/in-memory/check-in.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CheckInUseCase } from './check-in'

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new CheckInUseCase(checkInRepository)
  })

  it("should be able to create a check-in", async () => {
    const { checkIn } = await sut.execute({ gymId: '123', userId: '123' });

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
