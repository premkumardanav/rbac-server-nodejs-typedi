export type RoleType = "doctor" | "nurse";

export interface CreateUserReq {
  email: string;
  password: string;
  role: RoleType;
}

export interface CreateUserRes {
  id: string;
  email: string;
  role: RoleType;
}
