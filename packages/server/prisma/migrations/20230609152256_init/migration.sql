-- CreateTable
CREATE TABLE "UserPasswordResetRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPasswordResetRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPasswordResetRequest_id_key" ON "UserPasswordResetRequest"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserPasswordResetRequest_userId_key" ON "UserPasswordResetRequest"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPasswordResetRequest_token_key" ON "UserPasswordResetRequest"("token");

-- AddForeignKey
ALTER TABLE "UserPasswordResetRequest" ADD CONSTRAINT "UserPasswordResetRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
