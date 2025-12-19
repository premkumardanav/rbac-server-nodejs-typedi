import "reflect-metadata";
import { AppDataSource } from "../config/datasource.js";
import { User } from "../entities/User.js";
import { UserRole } from "../enums/UserRole.js";
import { hashPassword } from "../common/utils/hash.js";

async function seedDatabase() {
  try {
    await AppDataSource.initialize();
    console.log("✅ Database connected");

    const userRepository = AppDataSource.getRepository(User);

    // Sample users data
    const sampleUsers = [
      {
        email: "admin@example.com",
        password: "admin@123",
        role: UserRole.ADMIN,
      },
      {
        email: "doctor@example.com",
        password: "doctor@123",
        role: UserRole.DOCTOR,
      },
      {
        email: "nurse@example.com",
        password: "nurse@123",
        role: UserRole.NURSE,
      },
      {
        email: "doctor2@example.com",
        password: "doctor@123",
        role: UserRole.DOCTOR,
      },
    ];

    // Check if users already exist
    const existingUsers = await userRepository.find();
    if (existingUsers.length > 0) {
      console.log(
        `⚠️  Database already has ${existingUsers.length} users. Skipping seed.`
      );
      console.log("\n📋 Existing users:");
      existingUsers.forEach((user) => {
        console.log(
          `   - Email: ${user.email}, Role: ${user.role}, ID: ${user.id}`
        );
      });
      await AppDataSource.destroy();
      return;
    }

    // Hash passwords and create users
    console.log("🌱 Seeding database with sample users...");
    for (const userData of sampleUsers) {
      const hashedPassword = await hashPassword(userData.password);
      const user = userRepository.create({
        email: userData.email,
        password: hashedPassword,
        role: userData.role,
      });
      await userRepository.save(user);
      console.log(
        `✅ Created ${userData.role.toUpperCase()}: ${userData.email}`
      );
    }

    console.log("\n✨ Seeding completed successfully!");
    console.log("\n📝 Sample Login Credentials:");
    console.log("-----------------------------------");
    sampleUsers.forEach((user) => {
      console.log(`${user.role.toUpperCase()}:`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Password: ${user.password}`);
      console.log("");
    });

    await AppDataSource.destroy();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
