-- DropForeignKey
ALTER TABLE "TopUpRating" DROP CONSTRAINT "TopUpRating_reviewId_fkey";

-- AlterTable
ALTER TABLE "TopUpRating" ALTER COLUMN "reviewId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TopUpRating" ADD CONSTRAINT "TopUpRating_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "TopUpReview"("id") ON DELETE SET NULL ON UPDATE CASCADE;
