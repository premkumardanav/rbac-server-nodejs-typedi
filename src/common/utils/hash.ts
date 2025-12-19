import bcrypt from "bcrypt";

export const hashPassword = async (pwd: string) => bcrypt.hash(pwd, 12);
export const comparePassword = (pwd: string, hash: string) =>
  bcrypt.compare(pwd, hash);
