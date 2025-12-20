import { User as UserEntity } from "../entities/User.js";
import { Patient as PatientEntity } from "../entities/Patient.js";

export interface IUserPublic {
  id: string;
  email: string;
  role: UserEntity["role"];
}

export interface IPatientPublic {
  id: string;
  name: string;
  diagnosis?: string | null;
  doctor?: { id: string } | null;
  nurse?: { id: string } | null;
}

import { Request } from "express";
export interface RequestWithUser extends Request {
  user?: IUserPublic;
}
