/*
  Warnings:

  - Added the required column `improvement` to the `CommentsContentGenerated` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `CommentsContentGenerated` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommentsContentGenerated" ADD COLUMN     "improvement" TEXT NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL;
