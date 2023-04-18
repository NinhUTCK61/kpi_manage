/*
  Warnings:

  - A unique constraint covering the columns `[user_id,template_id]` on the table `UserTemplate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserTemplate_user_id_template_id_key" ON "UserTemplate"("user_id", "template_id");
