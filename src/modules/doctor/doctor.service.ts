import { Service } from "typedi";
import { AppDataSource } from "../../config/datasource.ts";
import { Patient } from "../../entities/Patient.ts";
import { User } from "../../entities/User.ts";
import { IPatientPublic } from "../../types/models.ts";
import { UserRole } from "../../enums/UserRole.ts";

@Service()
export class DoctorService {
  patientRepo = AppDataSource.getRepository(Patient);
  userRepo = AppDataSource.getRepository(User);

  async createPatient(doctorId: string, name: string, diagnosis?: string) {
    const p = this.patientRepo.create({
      name,
      diagnosis,
      doctor: { id: doctorId },
    } as Partial<Patient>);
    const saved = await this.patientRepo.save(p as Patient);
    const result: IPatientPublic = {
      id: saved.id,
      name: saved.name,
      diagnosis: saved.diagnosis ?? null,
      doctor: { id: doctorId },
    };
    return result;
  }

  async updatePatient(
    doctorId: string,
    patientId: string,
    data: Partial<Patient>
  ) {
    const patient = await this.patientRepo.findOne({
      where: { id: patientId },
      relations: ["doctor"],
    });
    if (!patient) throw new Error("Patient not found");
    if (patient.doctor?.id !== doctorId) throw new Error("Not allowed");

    if (data.name) patient.name = data.name;
    if ((data as any).diagnosis !== undefined)
      patient.diagnosis = (data as any).diagnosis;

    await this.patientRepo.save(patient);
    return { id: patient.id, name: patient.name };
  }

  async assignNurse(doctorId: string, patientId: string, nurseId: string) {
    const patient = await this.patientRepo.findOne({
      where: { id: patientId },
      relations: ["doctor"],
    });
    if (!patient) throw new Error("Patient not found");
    if (patient.doctor?.id !== doctorId) throw new Error("Not allowed");

    const nurse = await this.userRepo.findOne({ where: { id: nurseId } });
    if (!nurse || nurse.role !== UserRole.NURSE)
      throw new Error("Nurse not found");

    patient.nurse = nurse as any;
    await this.patientRepo.save(patient);
    return { id: patient.id };
  }
}
