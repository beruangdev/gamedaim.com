-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'PRO_USER', 'AUTHOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('PUBLISHED', 'DRAFT', 'REJECTED', 'IN_REVIEW');

-- CreateEnum
CREATE TYPE "TopicType" AS ENUM ('ALL', 'ARTICLE', 'REVIEW', 'TUTORIAL', 'MOVIE', 'TV', 'GAME');

-- CreateEnum
CREATE TYPE "AdType" AS ENUM ('ADSENSE', 'PLAIN_AD');

-- CreateEnum
CREATE TYPE "AdPosition" AS ENUM ('HOME_BELOW_HEADER', 'ARTICLE_BELOW_HEADER', 'TOPIC_BELOW_HEADER', 'SINGLE_ARTICLE_ABOVE_CONTENT', 'SINGLE_ARTICLE_MIDDLE_CONTENT', 'SINGLE_ARTICLE_BELOW_CONTENT', 'SINGLE_ARTICLE_POP_UP');

-- CreateEnum
CREATE TYPE "DownloadType" AS ENUM ('app', 'game');

-- CreateEnum
CREATE TYPE "DownloadSchema" AS ENUM ('DownloadApp', 'BusinessApp', 'MultimediaApp', 'MobileApp', 'WebApp', 'SocialNetworkingApp', 'TravelApp', 'ShoppingApp', 'SportsApp', 'LifeStyleApp', 'DesignApp', 'DeveloperApp', 'DriverApp', 'EducationalApp', 'HealthApp', 'FinanceApp', 'SecurityApp', 'BrowserApp', 'CommunicationApp', 'HomeApp', 'UtilitiesApp', 'RefereceApp', 'GameApp');

-- CreateEnum
CREATE TYPE "LanguageType" AS ENUM ('id_ID', 'en_US');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'PAID', 'FAILED', 'EXPIRED', 'ERROR', 'REFUNDED');

-- CreateEnum
CREATE TYPE "TopUpStatus" AS ENUM ('PROCESSING', 'SUCCESS', 'FAILED', 'ERROR');

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
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticlePrimary" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArticlePrimary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "language" "LanguageType" NOT NULL DEFAULT 'id_ID',
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "featuredImageId" TEXT NOT NULL,
    "articlePrimaryId" TEXT NOT NULL,
    "status" "PostStatus" NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicPrimary" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TopicPrimary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "language" "LanguageType" NOT NULL DEFAULT 'id_ID',
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "type" "TopicType" NOT NULL DEFAULT 'ALL',
    "topicPrimaryId" TEXT NOT NULL,
    "featuredImageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleComment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArticleComment_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Ad" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "position" "AdPosition" NOT NULL DEFAULT 'HOME_BELOW_HEADER',
    "type" "AdType" NOT NULL DEFAULT 'PLAIN_AD',
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ad_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "DownloadPrimary" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DownloadPrimary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Download" (
    "id" TEXT NOT NULL,
    "language" "LanguageType" NOT NULL DEFAULT 'id_ID',
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "featuredImageId" TEXT NOT NULL,
    "developer" TEXT NOT NULL,
    "operatingSystem" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "officialWeb" TEXT NOT NULL,
    "schemaType" "DownloadSchema" NOT NULL DEFAULT 'DownloadApp',
    "type" "DownloadType" NOT NULL DEFAULT 'app',
    "status" "PostStatus" NOT NULL DEFAULT 'PUBLISHED',
    "downloadPrimaryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Download_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DownloadFile" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "featuredImageId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "downloadLink" TEXT NOT NULL,
    "fileSize" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "status" "PostStatus" NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DownloadFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DownloadComment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "downloadId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DownloadComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voucher" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "voucher_code" TEXT NOT NULL,
    "discount_percentage" INTEGER NOT NULL,
    "discount_max" INTEGER NOT NULL,
    "voucher_amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "expiration" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViewCounter" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ViewCounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopUpReview" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TopUpReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopUpReviewReply" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TopUpReviewReply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopUpRating" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TopUpRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopUpTransaction" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "paymentProvider" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "customerName" TEXT,
    "customerEmail" TEXT,
    "customerPhone" TEXT NOT NULL,
    "voucherCode" TEXT,
    "discountAmount" INTEGER NOT NULL,
    "feeAmount" INTEGER NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "note" TEXT,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "status" "TopUpStatus" NOT NULL DEFAULT 'PROCESSING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TopUpTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopUpPriceList" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TopUpPriceList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionCounter" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "transactions" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransactionCounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArticleTopics" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ArticleAuthors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ArticleEditors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DownloadAuthors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DownloadFilesToDownload" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DownloadTopics" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DownloadFileAuthors" (
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
CREATE UNIQUE INDEX "ArticlePrimary_id_key" ON "ArticlePrimary"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Article_id_key" ON "Article"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TopicPrimary_id_key" ON "TopicPrimary"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_id_key" ON "Topic"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_slug_key" ON "Topic"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleComment_id_key" ON "ArticleComment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Media_id_key" ON "Media"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Media_name_key" ON "Media"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Media_url_key" ON "Media"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Ad_id_key" ON "Ad"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ad_title_key" ON "Ad"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_id_key" ON "Setting"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_key_key" ON "Setting"("key");

-- CreateIndex
CREATE UNIQUE INDEX "DownloadPrimary_id_key" ON "DownloadPrimary"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Download_id_key" ON "Download"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Download_slug_key" ON "Download"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "DownloadFile_id_key" ON "DownloadFile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DownloadFile_slug_key" ON "DownloadFile"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "DownloadComment_id_key" ON "DownloadComment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_id_key" ON "Voucher"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_voucher_code_key" ON "Voucher"("voucher_code");

-- CreateIndex
CREATE UNIQUE INDEX "ViewCounter_id_key" ON "ViewCounter"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ViewCounter_slug_key" ON "ViewCounter"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TopUpReview_id_key" ON "TopUpReview"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TopUpReviewReply_id_key" ON "TopUpReviewReply"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TopUpRating_id_key" ON "TopUpRating"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TopUpTransaction_id_key" ON "TopUpTransaction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TopUpTransaction_invoiceId_key" ON "TopUpTransaction"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "TopUpPriceList_id_key" ON "TopUpPriceList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TopUpPriceList_key_key" ON "TopUpPriceList"("key");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionCounter_id_key" ON "TransactionCounter"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionCounter_brand_key" ON "TransactionCounter"("brand");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleTopics_AB_unique" ON "_ArticleTopics"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleTopics_B_index" ON "_ArticleTopics"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleAuthors_AB_unique" ON "_ArticleAuthors"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleAuthors_B_index" ON "_ArticleAuthors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleEditors_AB_unique" ON "_ArticleEditors"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleEditors_B_index" ON "_ArticleEditors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DownloadAuthors_AB_unique" ON "_DownloadAuthors"("A", "B");

-- CreateIndex
CREATE INDEX "_DownloadAuthors_B_index" ON "_DownloadAuthors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DownloadFilesToDownload_AB_unique" ON "_DownloadFilesToDownload"("A", "B");

-- CreateIndex
CREATE INDEX "_DownloadFilesToDownload_B_index" ON "_DownloadFilesToDownload"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DownloadTopics_AB_unique" ON "_DownloadTopics"("A", "B");

-- CreateIndex
CREATE INDEX "_DownloadTopics_B_index" ON "_DownloadTopics"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DownloadFileAuthors_AB_unique" ON "_DownloadFileAuthors"("A", "B");

-- CreateIndex
CREATE INDEX "_DownloadFileAuthors_B_index" ON "_DownloadFileAuthors"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profilePictureId_fkey" FOREIGN KEY ("profilePictureId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_featuredImageId_fkey" FOREIGN KEY ("featuredImageId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_articlePrimaryId_fkey" FOREIGN KEY ("articlePrimaryId") REFERENCES "ArticlePrimary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_topicPrimaryId_fkey" FOREIGN KEY ("topicPrimaryId") REFERENCES "TopicPrimary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_featuredImageId_fkey" FOREIGN KEY ("featuredImageId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleComment" ADD CONSTRAINT "ArticleComment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleComment" ADD CONSTRAINT "ArticleComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Download" ADD CONSTRAINT "Download_downloadPrimaryId_fkey" FOREIGN KEY ("downloadPrimaryId") REFERENCES "DownloadPrimary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Download" ADD CONSTRAINT "Download_featuredImageId_fkey" FOREIGN KEY ("featuredImageId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DownloadFile" ADD CONSTRAINT "DownloadFile_featuredImageId_fkey" FOREIGN KEY ("featuredImageId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DownloadComment" ADD CONSTRAINT "DownloadComment_downloadId_fkey" FOREIGN KEY ("downloadId") REFERENCES "Download"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DownloadComment" ADD CONSTRAINT "DownloadComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopUpReview" ADD CONSTRAINT "TopUpReview_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopUpReviewReply" ADD CONSTRAINT "TopUpReviewReply_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "TopUpReview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopUpReviewReply" ADD CONSTRAINT "TopUpReviewReply_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopUpRating" ADD CONSTRAINT "TopUpRating_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopUpRating" ADD CONSTRAINT "TopUpRating_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "TopUpReview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleTopics" ADD CONSTRAINT "_ArticleTopics_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleTopics" ADD CONSTRAINT "_ArticleTopics_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleAuthors" ADD CONSTRAINT "_ArticleAuthors_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleAuthors" ADD CONSTRAINT "_ArticleAuthors_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleEditors" ADD CONSTRAINT "_ArticleEditors_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleEditors" ADD CONSTRAINT "_ArticleEditors_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownloadAuthors" ADD CONSTRAINT "_DownloadAuthors_A_fkey" FOREIGN KEY ("A") REFERENCES "Download"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownloadAuthors" ADD CONSTRAINT "_DownloadAuthors_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownloadFilesToDownload" ADD CONSTRAINT "_DownloadFilesToDownload_A_fkey" FOREIGN KEY ("A") REFERENCES "Download"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownloadFilesToDownload" ADD CONSTRAINT "_DownloadFilesToDownload_B_fkey" FOREIGN KEY ("B") REFERENCES "DownloadFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownloadTopics" ADD CONSTRAINT "_DownloadTopics_A_fkey" FOREIGN KEY ("A") REFERENCES "Download"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownloadTopics" ADD CONSTRAINT "_DownloadTopics_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownloadFileAuthors" ADD CONSTRAINT "_DownloadFileAuthors_A_fkey" FOREIGN KEY ("A") REFERENCES "DownloadFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownloadFileAuthors" ADD CONSTRAINT "_DownloadFileAuthors_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
