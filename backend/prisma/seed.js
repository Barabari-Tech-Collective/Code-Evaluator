import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const colleges = [
    { name: "City College" },
    { name: "Begumpet" },
    { name: "HussainiAlam" },
    { name: "BJR" },
  ];

  for (const college of colleges) {
    await prisma.college.upsert({
      where: { name: college.name },
      update: {},
      create: college,
    });
  }

  console.log("✅ Colleges seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
