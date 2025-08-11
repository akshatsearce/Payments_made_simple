-- AlterTable
ALTER TABLE "public"."OnRampTransaction" ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."p2pTransfer" ALTER COLUMN "status" DROP DEFAULT;
