/*
  Warnings:

  - Added the required column `authorId` to the `TopicTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TopicTranslation" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TopicTranslation" ADD CONSTRAINT "TopicTranslation_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
