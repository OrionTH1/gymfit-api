import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { AuthenticateUseCase } from './authenticate'
import { UserCredentialsInvalid } from './errors/user-credentials-invalid.error'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it("should not be able to authenticate with wrong email", async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: '1234'
    })
    const userCredentials = { email: "wrongemail@example.com", password: "1234" }

    await expect(sut.execute(userCredentials)).rejects.toBeInstanceOf(UserCredentialsInvalid)
  })

  it("should not be able to authenticate with wrong password", async () => {
    const userCredentials = { email: "john.doe@example.com", password: "wrongpassword" }

    await expect(sut.execute(userCredentials)).rejects.toBeInstanceOf(UserCredentialsInvalid)
  })

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('1234', 6)
    })

    const userCredentials = { email: "john.doe@example.com", password: "1234" }

    const { user } = await sut.execute(userCredentials)

    expect(user.id).toEqual(expect.any(String))
  })

})
