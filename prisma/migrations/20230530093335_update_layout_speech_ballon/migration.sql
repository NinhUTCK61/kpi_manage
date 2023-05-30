/*
  Warnings:

  - You are about to drop the column `stroke` on the `SpeechBallon` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "LayoutType" AS ENUM ('STROKE', 'FILL');

-- AlterTable
ALTER TABLE "SpeechBallon" DROP COLUMN "stroke",
ADD COLUMN     "layout" "LayoutType" NOT NULL DEFAULT 'FILL';
