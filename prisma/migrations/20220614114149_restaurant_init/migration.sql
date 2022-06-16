/*
  Warnings:

  - The primary key for the `Dish` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Dish` table. All the data in the column will be lost.
  - Added the required column `name` to the `Dish` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_pkey",
DROP COLUMN "id",
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "Dish_pkey" PRIMARY KEY ("name");
