import { InMemoryCheckInRepository } from '@/repositories/in-memory/check-in.repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new CheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to create a check-in", async () => {
    const { checkIn } = await sut.execute({ gymId: '123', userId: '123' });

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it("should not be able to create a check-in twice in the same day", async () => {
    vi.setSystemTime(new Date())
    await sut.execute({ gymId: '123', userId: '123' });

    await expect(sut.execute({ gymId: '123', userId: '123' })).rejects.toBeInstanceOf(Error)
  })

  it("should be able to create a check-in twice in different days", async () => {
    vi.setSystemTime(new Date(2025, 1, 1))
    await sut.execute({ gymId: '123', userId: '123' });

    vi.setSystemTime(new Date(2025, 1, 2))
    const { checkIn } = await sut.execute({ gymId: '123', userId: '123' })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
