/*
  Warnings:

  - You are about to drop the column `content` on the `ContentGenerated` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `ContentGenerated` table. All the data in the column will be lost.
  - You are about to drop the column `generalsentiment` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `resume` on the `Review` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reviewId]` on the table `ContentGenerated` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recommendations` to the `ContentGenerated` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewId` to the `ContentGenerated` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentiment` to the `ContentGenerated` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `ContentGenerated` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContentGenerated" DROP COLUMN "content",
DROP COLUMN "title",
ADD COLUMN     "recommendations" TEXT NOT NULL,
ADD COLUMN     "reviewId" TEXT NOT NULL,
ADD COLUMN     "sentiment" TEXT NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL,
ADD COLUMN     "themes" TEXT[];

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "generalsentiment",
DROP COLUMN "resume";

-- CreateIndex
CREATE UNIQUE INDEX "ContentGenerated_reviewId_key" ON "ContentGenerated"("reviewId");

-- AddForeignKey
ALTER TABLE "ContentGenerated" ADD CONSTRAINT "ContentGenerated_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
