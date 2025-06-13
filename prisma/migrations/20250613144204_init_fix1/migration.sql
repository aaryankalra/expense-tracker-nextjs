/*
  Warnings:

  - You are about to drop the column `totalExpense` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `totalIncome` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "totalExpense",
DROP COLUMN "totalIncome";
