import { UsersRepository } from "@/repositories/users.repository";
import { User } from "generated/prisma";
import { UserCredentialsInvalid } from "./errors/user-credentials-invalid.error";
import { compare } from "bcryptjs";

type AuthenticateUseCaseRequest = {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = {
  user: User
}

export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepository) { }

  async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new UserCredentialsInvalid()
    }

    const doesPasswordMatch = await compare(password, user.password_hash)

    if (!doesPasswordMatch) {
      throw new UserCredentialsInvalid()
    }

    return { user }
  }
}
