import { CheckInRepository } from "@/repositories/check-in.repository";
import { CheckIn } from "generated/prisma";
import { CheckInAlreadyExistsError } from "./errors/check-in-already-exits.error";
import { GymsRepository } from "@/repositories/gyms.repository";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

type CheckInUseCaseRequest = {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

type CheckInUseCaseResponse = {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInRepository: CheckInRepository, private gymsRepository: GymsRepository) { }

  async execute({ userId, gymId, userLatitude, userLongitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distanceInKm = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    );

    const MAX_DISTANCE_IN_KM = 0.1;
    if (distanceInKm > MAX_DISTANCE_IN_KM) {
      throw new Error('User is too far from the gym')
    }

    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDay) {
      throw new CheckInAlreadyExistsError()
    }

    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId
    })

    return { checkIn }
  }
}
