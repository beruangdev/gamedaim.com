-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'PRO_USER', 'AUTHOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "TopicType" AS ENUM ('ALL', 'ARTICLE', 'REVIEW', 'TUTORIAL', 'MOVIE', 'TV', 'GAME');

-- CreateEnum
CREATE TYPE "LanguageType" AS ENUM ('id_ID', 'en_US');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "phoneNumber" TEXT,
    "profilePictureId" TEXT,
    "about" TEXT,
    "password" TEXT NOT NULL,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "TopicType" NOT NULL DEFAULT 'ALL',
    "featuredImageId" TEXT,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicTranslation" (
    "id" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "language" "LanguageType" NOT NULL DEFAULT 'id_ID',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TopicTranslation_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_id_key" ON "Topic"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_slug_key" ON "Topic"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TopicTranslation_id_key" ON "TopicTranslation"("id");

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

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profilePictureId_fkey" FOREIGN KEY ("profilePictureId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_featuredImageId_fkey" FOREIGN KEY ("featuredImageId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicTranslation" ADD CONSTRAINT "TopicTranslation_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
