/*
  Warnings:

  - Added the required column `countryName` to the `SavedCountry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryName` to the `TravelPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryName` to the `VisitedCountry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SavedCountry" ADD COLUMN     "countryName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TravelPlan" ADD COLUMN     "countryName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VisitedCountry" ADD COLUMN     "countryName" TEXT NOT NULL;
