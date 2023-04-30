-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'PRO_USER', 'AUTHOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "TopicType" AS ENUM ('ALL', 'ARTICLE', 'REVIEW', 'TUTORIAL', 'MOVIE', 'TV', 'GAME');

-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "MovieVideoType" AS ENUM ('TRAILER', 'TEASER', 'CLIP', 'BEHIND_THE_SCENE', 'BLOOPER', 'FEATURE');

-- CreateEnum
CREATE TYPE "LanguageType" AS ENUM ('id_ID', 'en_US');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "gender" "GenderType",
    "phoneNumber" TEXT,
    "about" TEXT,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "metaDescription" TEXT,
    "metaTitle" TEXT,
    "profilePictureId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "type" "TopicType" NOT NULL DEFAULT 'ALL',
    "featuredImageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicTranslation" (
    "id" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "metaDescription" TEXT,
    "metaTitle" TEXT,
    "language" "LanguageType" NOT NULL DEFAULT 'id_ID',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TopicTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "originalTitle" TEXT NOT NULL,
    "originalLanguage" "LanguageType" NOT NULL DEFAULT 'id_ID',
    "overview" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "slug" TEXT NOT NULL,
    "releaseDate" TEXT NOT NULL,
    "spokenLanguage" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'released',
    "tagline" TEXT,
    "budget" INTEGER,
    "revenue" INTEGER,
    "popularity" INTEGER NOT NULL DEFAULT 0,
    "voteAverage" INTEGER NOT NULL DEFAULT 0,
    "voteCount" INTEGER NOT NULL DEFAULT 0,
    "posterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieGenre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "movieId" TEXT NOT NULL,

    CONSTRAINT "MovieGenre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieVideo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "URL" TEXT NOT NULL,
    "type" "MovieVideoType" NOT NULL DEFAULT 'TEASER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovieVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionCompany" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "originCountry" TEXT,
    "headquarters" TEXT,
    "logoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductionCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "People" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "biography" TEXT,
    "birthday" TEXT,
    "deathday" TEXT,
    "placeOfBirth" TEXT,
    "gender" "GenderType" NOT NULL DEFAULT 'MALE',
    "popularity" INTEGER NOT NULL DEFAULT 0,
    "profilePictureId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "People_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieVideos" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MovieProductionCompanies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MoviePhotos" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_id_key" ON "Topic"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TopicTranslation_id_key" ON "TopicTranslation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TopicTranslation_slug_key" ON "TopicTranslation"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_id_key" ON "Movie"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_slug_key" ON "Movie"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "MovieGenre_id_key" ON "MovieGenre"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MovieGenre_slug_key" ON "MovieGenre"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "MovieVideo_id_key" ON "MovieVideo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductionCompany_id_key" ON "ProductionCompany"("id");

-- CreateIndex
CREATE UNIQUE INDEX "People_id_key" ON "People"("id");

-- CreateIndex
CREATE UNIQUE INDEX "People_slug_key" ON "People"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Media_id_key" ON "Media"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Media_name_key" ON "Media"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Media_url_key" ON "Media"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_id_key" ON "Setting"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_key_key" ON "Setting"("key");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieVideos_AB_unique" ON "_MovieVideos"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieVideos_B_index" ON "_MovieVideos"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieProductionCompanies_AB_unique" ON "_MovieProductionCompanies"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieProductionCompanies_B_index" ON "_MovieProductionCompanies"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MoviePhotos_AB_unique" ON "_MoviePhotos"("A", "B");

-- CreateIndex
CREATE INDEX "_MoviePhotos_B_index" ON "_MoviePhotos"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profilePictureId_fkey" FOREIGN KEY ("profilePictureId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_featuredImageId_fkey" FOREIGN KEY ("featuredImageId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicTranslation" ADD CONSTRAINT "TopicTranslation_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionCompany" ADD CONSTRAINT "ProductionCompany_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "People" ADD CONSTRAINT "People_profilePictureId_fkey" FOREIGN KEY ("profilePictureId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieVideos" ADD CONSTRAINT "_MovieVideos_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieVideos" ADD CONSTRAINT "_MovieVideos_B_fkey" FOREIGN KEY ("B") REFERENCES "MovieVideo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieProductionCompanies" ADD CONSTRAINT "_MovieProductionCompanies_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieProductionCompanies" ADD CONSTRAINT "_MovieProductionCompanies_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductionCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoviePhotos" ADD CONSTRAINT "_MoviePhotos_A_fkey" FOREIGN KEY ("A") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoviePhotos" ADD CONSTRAINT "_MoviePhotos_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
