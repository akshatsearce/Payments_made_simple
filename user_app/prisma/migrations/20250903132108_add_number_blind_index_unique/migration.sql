-- CreateTable
CREATE TABLE "public"."PhoneIndex" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "partialHash" TEXT NOT NULL,

    CONSTRAINT "PhoneIndex_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PhoneIndex_partialHash_idx" ON "public"."PhoneIndex"("partialHash");

-- AddForeignKey
ALTER TABLE "public"."PhoneIndex" ADD CONSTRAINT "PhoneIndex_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
