/*
  Warnings:

  - Made the column `content` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `author_id` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `CommentReply` required. This step will fail if there are existing NULL values in that column.
  - Made the column `author_id` on table `CommentReply` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_author_id_fkey";

-- DropForeignKey
ALTER TABLE "CommentReply" DROP CONSTRAINT "CommentReply_author_id_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "author_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "CommentReply" ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "author_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReply" ADD CONSTRAINT "CommentReply_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
