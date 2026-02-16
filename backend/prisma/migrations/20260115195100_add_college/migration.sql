/*
  Warnings:

  - You are about to drop the column `college` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `college` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `colleges` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `collegeId` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collegeId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collegeId` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "college",
ADD COLUMN     "collegeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "college",
ADD COLUMN     "collegeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "colleges",
ADD COLUMN     "collegeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "College" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "College_name_key" ON "College"("name");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
