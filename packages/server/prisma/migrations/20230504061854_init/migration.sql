/*
  Warnings:

  - You are about to drop the `_MovieCrews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MovieCasts" DROP CONSTRAINT "_MovieCasts_B_fkey";

-- DropForeignKey
ALTER TABLE "_MovieCrews" DROP CONSTRAINT "_MovieCrews_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieCrews" DROP CONSTRAINT "_MovieCrews_B_fkey";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "homePage" TEXT;

-- DropTable
DROP TABLE "_MovieCrews";

-- CreateTable
CREATE TABLE "MovieCast" (
    "id" TEXT NOT NULL,
    "popularity" INTEGER NOT NULL DEFAULT 0,
    "character" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovieCast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PeopleCasts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MovieCast_id_key" ON "MovieCast"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_PeopleCasts_AB_unique" ON "_PeopleCasts"("A", "B");

-- CreateIndex
CREATE INDEX "_PeopleCasts_B_index" ON "_PeopleCasts"("B");

-- AddForeignKey
ALTER TABLE "_MovieCasts" ADD CONSTRAINT "_MovieCasts_B_fkey" FOREIGN KEY ("B") REFERENCES "MovieCast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PeopleCasts" ADD CONSTRAINT "_PeopleCasts_A_fkey" FOREIGN KEY ("A") REFERENCES "MovieCast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PeopleCasts" ADD CONSTRAINT "_PeopleCasts_B_fkey" FOREIGN KEY ("B") REFERENCES "People"("id") ON DELETE CASCADE ON UPDATE CASCADE;
