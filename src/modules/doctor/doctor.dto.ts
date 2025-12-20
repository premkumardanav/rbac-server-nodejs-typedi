export interface CreatePatientReq {
  name: string;
  diagnosis?: string;
}

export interface UpdatePatientReq {
  name?: string;
  diagnosis?: string;
}

export interface AssignNurseReq {
  nurseId: string;
}
