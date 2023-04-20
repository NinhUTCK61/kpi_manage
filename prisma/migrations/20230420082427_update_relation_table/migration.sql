/*
  Warnings:

  - Added the required column `template_id` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_parent_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_parent_node_id_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_template_id_fkey";

-- DropForeignKey
ALTER TABLE "SpeechBallon" DROP CONSTRAINT "SpeechBallon_node_id_fkey";

-- DropForeignKey
ALTER TABLE "SpeechBallon" DROP CONSTRAINT "SpeechBallon_template_id_fkey";

-- DropForeignKey
ALTER TABLE "UserTemplate" DROP CONSTRAINT "UserTemplate_user_id_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "template_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTemplate" ADD CONSTRAINT "UserTemplate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_parent_node_id_fkey" FOREIGN KEY ("parent_node_id") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeechBallon" ADD CONSTRAINT "SpeechBallon_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeechBallon" ADD CONSTRAINT "SpeechBallon_node_id_fkey" FOREIGN KEY ("node_id") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;
