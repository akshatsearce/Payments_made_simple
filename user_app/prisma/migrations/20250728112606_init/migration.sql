-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "phone_number" TEXT NOT NULL,
    "fullname" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_number_key" ON "user"("phone_number");
