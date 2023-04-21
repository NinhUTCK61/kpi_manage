/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReasonType" AS ENUM ('REASON_KNOW', 'ISSUE');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "company_name" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date_of_birth" TIMESTAMP(3),
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "role_in_company" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Reason" (
    "id" SERIAL NOT NULL,
    "text_ja" TEXT NOT NULL,
    "text_en" TEXT NOT NULL,
    "type" "ReasonType" NOT NULL DEFAULT 'REASON_KNOW',
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserReason" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "reason_id" INTEGER NOT NULL,
    "userId" TEXT,
    "reasonId" INTEGER,

    CONSTRAINT "UserReason_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserReason_user_id_reason_id_key" ON "UserReason"("user_id", "reason_id");

-- AddForeignKey
ALTER TABLE "UserReason" ADD CONSTRAINT "UserReason_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReason" ADD CONSTRAINT "UserReason_reasonId_fkey" FOREIGN KEY ("reasonId") REFERENCES "Reason"("id") ON DELETE CASCADE ON UPDATE CASCADE;
