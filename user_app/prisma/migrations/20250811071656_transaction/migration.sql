/*
  Warnings:

  - The `status` column on the `OnRampTransaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."TransactionStatus" AS ENUM ('SUCCESS', 'FAILURE', 'PROCESSING');

-- AlterTable
ALTER TABLE "public"."OnRampTransaction" DROP COLUMN "status",
ADD COLUMN     "status" "public"."TransactionStatus" NOT NULL DEFAULT 'SUCCESS';

-- AlterTable
ALTER TABLE "public"."p2pTransfer" ADD COLUMN     "status" "public"."TransactionStatus" NOT NULL DEFAULT 'SUCCESS';

-- DropEnum
DROP TYPE "public"."OnRampStatus";
