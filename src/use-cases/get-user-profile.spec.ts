import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { GetUserProfileUseCase } from './get-user-profile'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it("should be able to get user profile", async () => {

    const user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '1234'
    }

    const userCreated = await usersRepository.create({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: '1234',
      created_at: new Date(),
    })

    const { user: userFound } = await sut.execute({ user_id: userCreated.id });

    expect(userFound.email).toEqual(user.email)
  })

  it("should not be able to get user profile with user id wrong", async () => {
    await expect(sut.execute({ user_id: '123' })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
