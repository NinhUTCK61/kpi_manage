/*
  Warnings:

  - You are about to drop the column `rep_to_comment_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_ad` on the `UserTemplate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_rep_to_comment_id_fkey";

-- DropIndex
DROP INDEX "Node_parent_node_id_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "rep_to_comment_id",
ADD COLUMN     "parent_comment_id" TEXT;

-- AlterTable
ALTER TABLE "Template" ALTER COLUMN "deleted_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserTemplate" DROP COLUMN "deleted_ad",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
