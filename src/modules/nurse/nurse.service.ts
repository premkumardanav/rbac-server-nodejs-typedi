import { Service } from "typedi";
import { AppDataSource } from "../../config/datasource.ts";
import { Patient } from "../../entities/Patient.ts";
import { IPatientPublic } from "../../types/models.ts";

@Service()
export class NurseService {
  patientRepo = AppDataSource.getRepository(Patient);

  async getAssignedPatients(nurseId: string): Promise<IPatientPublic[]> {
    const patients = await this.patientRepo.find({
      where: { nurse: { id: nurseId } },
      relations: ["doctor", "nurse"],
    });

    return patients.map((p) => ({
      id: p.id,
      name: p.name,
      diagnosis: p.diagnosis ?? null,
      doctor: p.doctor ? { id: p.doctor.id } : null,
      nurse: p.nurse ? { id: p.nurse.id } : null,
    }));
  }
}