-- CreateTable
CREATE TABLE "_MovieCasts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MovieCrews" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MovieCasts_AB_unique" ON "_MovieCasts"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieCasts_B_index" ON "_MovieCasts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieCrews_AB_unique" ON "_MovieCrews"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieCrews_B_index" ON "_MovieCrews"("B");

-- AddForeignKey
ALTER TABLE "_MovieCasts" ADD CONSTRAINT "_MovieCasts_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieCasts" ADD CONSTRAINT "_MovieCasts_B_fkey" FOREIGN KEY ("B") REFERENCES "People"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieCrews" ADD CONSTRAINT "_MovieCrews_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieCrews" ADD CONSTRAINT "_MovieCrews_B_fkey" FOREIGN KEY ("B") REFERENCES "People"("id") ON DELETE CASCADE ON UPDATE CASCADE;
