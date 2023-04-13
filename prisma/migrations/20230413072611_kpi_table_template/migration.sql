/*
  Warnings:

  - Changed the type of `deleted_at` on the `Template` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Template" DROP COLUMN "deleted_at",
ADD COLUMN     "deleted_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserTemplate" ADD COLUMN     "deleted_ad" TIMESTAMP(3);
