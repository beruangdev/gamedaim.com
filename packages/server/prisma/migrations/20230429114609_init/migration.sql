/*
  Warnings:

  - You are about to drop the column `authorId` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `TopicTranslation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_authorId_fkey";

-- DropForeignKey
ALTER TABLE "TopicTranslation" DROP CONSTRAINT "TopicTranslation_authorId_fkey";

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "authorId";

-- AlterTable
ALTER TABLE "TopicTranslation" DROP COLUMN "authorId";
