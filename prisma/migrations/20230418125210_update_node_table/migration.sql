/*
  Warnings:

  - Changed the type of `value_2_number` on the `Node` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_parent_node_id_fkey";

-- AlterTable
ALTER TABLE "Node" DROP COLUMN "value_2_number",
ADD COLUMN     "value_2_number" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "parent_node_id" DROP NOT NULL,
ALTER COLUMN "style" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_parent_node_id_fkey" FOREIGN KEY ("parent_node_id") REFERENCES "Node"("id") ON DELETE SET NULL ON UPDATE CASCADE;
