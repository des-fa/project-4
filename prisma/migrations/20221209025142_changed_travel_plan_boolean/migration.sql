/*
  Warnings:

  - You are about to drop the column `isPrivate` on the `TravelPlan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TravelPlan" DROP COLUMN "isPrivate",
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;
