import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository"
import { AuthenticateUseCase } from "@/use-cases/authenticate"
import { UserCredentialsInvalid } from "@/use-cases/errors/user-credentials-invalid.error"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const prismaUserRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository)

    await authenticateUseCase.execute({
      email, password
    })
  } catch (error) {
    if (error instanceof UserCredentialsInvalid) {
      return reply.status(400).send({ message: error.message })
    }

    return reply.status(500).send()
  }

  return reply.status(200).send()
}
