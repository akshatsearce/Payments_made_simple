/*
  Warnings:

  - A unique constraint covering the columns `[numberBlindIndex]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `numberBlindIndex` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "numberBlindIndex" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_numberBlindIndex_key" ON "public"."User"("numberBlindIndex");
