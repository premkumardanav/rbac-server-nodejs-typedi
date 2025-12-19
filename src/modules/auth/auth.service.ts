import { Service } from "typedi";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../config/datasource.ts";
import { User } from "../../entities/User.ts";
import { comparePassword } from "../../common/utils/hash.ts";
import { JWT_SECRET } from "../../config/env.ts";

@Service()
export class AuthService {
  repo = AppDataSource.getRepository(User);

  async login(email: string, password: string): Promise<string> {
    try {
      console.log("🔍 Login attempt for:", email);

      const user = await this.repo.findOne({ where: { email } });
      console.log(
        "👤 User found:",
        user ? `ID: ${user.id}, Email: ${user.email}` : "No user found"
      );

      if (!user) {
        console.error("❌ User not found in database");
        throw new Error("Invalid credentials");
      }

      console.log("🔐 Comparing passwords...");
      console.log("📝 Stored password hash exists:", !!user.password);

      const correct = await comparePassword(password, user.password);
      console.log("✅ Password match result:", correct);

      if (!correct) {
        console.error("❌ Password mismatch");
        throw new Error("Invalid credentials");
      }

      console.log("🎯 Generating JWT token for user:", user.id);
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      console.log("✨ Token generated successfully");

      return token;
    } catch (error: any) {
      console.error("💥 Auth service error:", error.message);
      throw error;
    }
  }
}
