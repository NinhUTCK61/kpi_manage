/*
  Warnings:

  - You are about to drop the column `value_2_number` on the `Node` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Node" DROP COLUMN "value_2_number",
ADD COLUMN     "value2number" DOUBLE PRECISION,
ALTER COLUMN "style" SET DATA TYPE TEXT;
