/*
  Warnings:

  - You are about to drop the column `style` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `style` on the `SpeechBallon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Node" DROP COLUMN "style",
ADD COLUMN     "node_style" TEXT;

-- AlterTable
ALTER TABLE "SpeechBallon" DROP COLUMN "style",
ADD COLUMN     "node_style" TEXT,
ALTER COLUMN "stroke" DROP NOT NULL,
ALTER COLUMN "stroke" SET DATA TYPE TEXT;
