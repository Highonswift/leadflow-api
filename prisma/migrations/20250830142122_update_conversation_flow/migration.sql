-- AlterTable
ALTER TABLE "public"."CallLog" ADD COLUMN     "endedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."Conversation" ADD COLUMN     "endReason" TEXT,
ADD COLUMN     "sessionId" TEXT,
ADD COLUMN     "summary" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'chat';

-- AlterTable
ALTER TABLE "public"."Message" ADD COLUMN     "messageType" TEXT NOT NULL DEFAULT 'text';
