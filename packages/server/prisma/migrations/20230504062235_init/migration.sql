-- CreateTable
CREATE TABLE "MovieCrew" (
    "id" TEXT NOT NULL,
    "popularity" INTEGER NOT NULL DEFAULT 0,
    "departement" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "character" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovieCrew_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieCrews" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PeopleCrews" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MovieCrew_id_key" ON "MovieCrew"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieCrews_AB_unique" ON "_MovieCrews"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieCrews_B_index" ON "_MovieCrews"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PeopleCrews_AB_unique" ON "_PeopleCrews"("A", "B");

-- CreateIndex
CREATE INDEX "_PeopleCrews_B_index" ON "_PeopleCrews"("B");

-- AddForeignKey
ALTER TABLE "_MovieCrews" ADD CONSTRAINT "_MovieCrews_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieCrews" ADD CONSTRAINT "_MovieCrews_B_fkey" FOREIGN KEY ("B") REFERENCES "MovieCrew"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PeopleCrews" ADD CONSTRAINT "_PeopleCrews_A_fkey" FOREIGN KEY ("A") REFERENCES "MovieCrew"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PeopleCrews" ADD CONSTRAINT "_PeopleCrews_B_fkey" FOREIGN KEY ("B") REFERENCES "People"("id") ON DELETE CASCADE ON UPDATE CASCADE;
