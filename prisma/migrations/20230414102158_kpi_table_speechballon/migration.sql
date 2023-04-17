/*
  Warnings:

  - You are about to drop the column `node_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `bg_color` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `child_no` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `input_value_style` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `title_style` on the `Node` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `style` to the `Node` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "node_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Node" DROP COLUMN "bg_color",
DROP COLUMN "child_no",
DROP COLUMN "input_value_style",
DROP COLUMN "level",
DROP COLUMN "title_style",
ADD COLUMN     "style" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "SpeechBallon" (
    "id" TEXT NOT NULL,
    "template_id" TEXT NOT NULL,
    "node_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "shape" TEXT NOT NULL,
    "style" JSONB NOT NULL,
    "stroke" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpeechBallon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SpeechBallon" ADD CONSTRAINT "SpeechBallon_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeechBallon" ADD CONSTRAINT "SpeechBallon_node_id_fkey" FOREIGN KEY ("node_id") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
