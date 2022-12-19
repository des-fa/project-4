/*
  Warnings:

  - A unique constraint covering the columns `[iso2]` on the table `SavedCountry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SavedCountry_iso2_key" ON "SavedCountry"("iso2");
