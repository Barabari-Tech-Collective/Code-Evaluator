/*
  Warnings:

  - You are about to drop the column `collegeId` on the `Teacher` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_collegeId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_userId_fkey";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "collegeId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "teacherId" TEXT;

-- CreateTable
CREATE TABLE "TeacherCollege" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "collegeId" TEXT NOT NULL,

    CONSTRAINT "TeacherCollege_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeacherCollege_teacherId_collegeId_key" ON "TeacherCollege"("teacherId", "collegeId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherCollege" ADD CONSTRAINT "TeacherCollege_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherCollege" ADD CONSTRAINT "TeacherCollege_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
