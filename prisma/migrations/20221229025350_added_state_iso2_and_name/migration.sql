/*
  Warnings:

  - You are about to drop the column `state` on the `Tip` table. All the data in the column will be lost.
  - Added the required column `stateIso2` to the `Tip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateName` to the `Tip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tip" DROP COLUMN "state",
ADD COLUMN     "stateIso2" TEXT NOT NULL,
ADD COLUMN     "stateName" TEXT NOT NULL;
