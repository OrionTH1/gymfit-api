import { Prisma, User } from "generated/prisma";
import { UsersRepository } from "../users.repository";

export class InMemoryUsersRepository implements UsersRepository {
  private items: User[] = []

  async findById(user_id: string) {
    const userFound = this.items.find((user) => user.id === user_id)

    if (!userFound) {
      return null;
    }

    return userFound
  }

  async findByEmail(email: string) {
    const userFound = this.items.find((user) => user.email === email)

    if (!userFound) {
      return null;
    }

    return userFound
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: '1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date()
    }

    this.items.push(user)

    return user
  }

}
