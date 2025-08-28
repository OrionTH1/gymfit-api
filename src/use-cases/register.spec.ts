import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { UserAlreadyExistsError } from './errors/user-already-exits.error'

describe('Register Use Case', () => {
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new RegisterUseCase(usersRepository)

    const user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '1234'
    }

    const { user: userCreated } = await sut.execute(user);

    expect(userCreated.id).toEqual(expect.any(String))
  })

  it("should not be able to register with existing email", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new RegisterUseCase(usersRepository)

    const user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '1234'
    }

    await sut.execute(user);

    await expect(sut.execute(user)).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new RegisterUseCase(usersRepository)

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '1234'
    });

    const isPasswordCorrectlyHashed = await compare('1234', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
