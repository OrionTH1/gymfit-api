import { Gym, Prisma } from "generated/prisma";
import { GymsRepository } from "../gyms.repository";
import { Decimal } from "@prisma/client/runtime/library";

export class InMemoryGymsRepository implements GymsRepository {
  private gyms: Gym[] = [];

  async create(gym: Prisma.GymCreateInput): Promise<Gym | null> {
    const newGym = {
      id: crypto.randomUUID(),
      title: gym.title,
      description: gym.description || "",
      phone: gym.phone || "",
      latitude: new Decimal(gym.latitude.toString()),
      longitude: new Decimal(gym.longitude.toString()),
    };

    this.gyms.push(newGym);

    return newGym;
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }


}
