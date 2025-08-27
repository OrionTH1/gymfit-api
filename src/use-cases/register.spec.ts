import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
  it("should hash user password upon registration", async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail() {
        return null;
      },

      async create(data) {
        return {
          id: '1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date
        }
      },
    })

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '1234'
    });

    const isPasswordCorrectlyHashed = await compare('1234', user.password_hash)
    console.log(user);
    console.log(isPasswordCorrectlyHashed);

    expect(isPasswordCorrectlyHashed).toBe(true)
  })


})
