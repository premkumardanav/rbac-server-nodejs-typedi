import { Service } from "typedi";
import { AppDataSource } from "../../config/datasource.ts";
import { User } from "../../entities/User.ts";
import { hashPassword } from "../../common/utils/hash.ts";
import { Patient } from "../../entities/Patient.ts";
import { IUserPublic } from "../../types/models.ts";

@Service()
export class AdminService {
  userRepo = AppDataSource.getRepository(User);
  patientRepo = AppDataSource.getRepository(Patient);

  async createUser(email: string, password: string, role: string) {
    const exists = await this.userRepo.findOne({ where: { email } });
    if (exists) throw new Error("User already exists");

    const hashed = await hashPassword(password);
    const userEntity = this.userRepo.create({
      email,
      password: hashed,
      role,
    } as Partial<User>);
    const savedUser = await this.userRepo.save(userEntity as User);

    const result: IUserPublic = {
      id: savedUser.id,
      email: savedUser.email,
      role: savedUser.role,
    };
    return result;
  }

  async deleteUser(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error("User not found");
    await this.userRepo.remove(user);
    return;
  }

  async deletePatient(patientId: string) {
    const patient = await this.patientRepo.findOne({
      where: { id: patientId },
    });
    if (!patient) throw new Error("Patient not found");
    await this.patientRepo.remove(patient);
    return;
  }
}
