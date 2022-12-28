/*
  Warnings:

  - Added the required column `state` to the `Tip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tip" ADD COLUMN     "state" TEXT NOT NULL;
