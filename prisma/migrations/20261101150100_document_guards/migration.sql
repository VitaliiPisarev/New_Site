-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "utmCampaign" VARCHAR(64),
ADD COLUMN     "utmMedium" VARCHAR(64),
ADD COLUMN     "utmSource" VARCHAR(64);

-- CreateTable
CREATE TABLE "DocumentPublication" (
    "type" "DocumentType" NOT NULL,
    "documentId" UUID NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentPublication_pkey" PRIMARY KEY ("type")
);

-- CreateTable
CREATE TABLE "RateLimitBucket" (
    "keyHash" CHAR(64) NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RateLimitBucket_pkey" PRIMARY KEY ("keyHash")
);

-- CreateTable
CREATE TABLE "ExportAuditEvent" (
    "id" UUID NOT NULL,
    "actorId" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recordCount" INTEGER NOT NULL,
    "filters" JSONB NOT NULL,

    CONSTRAINT "ExportAuditEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentPublication_documentId_key" ON "DocumentPublication"("documentId");

-- CreateIndex
CREATE INDEX "RateLimitBucket_expiresAt_idx" ON "RateLimitBucket"("expiresAt");

-- AddForeignKey
ALTER TABLE "DocumentPublication" ADD CONSTRAINT "DocumentPublication_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "DocumentVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE FUNCTION protect_document_version() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF OLD."approvedAt" IS NOT NULL AND (TG_OP = 'DELETE' OR NEW IS DISTINCT FROM OLD) THEN
    RAISE EXCEPTION 'Approved document versions are immutable';
  END IF;
  IF TG_OP = 'DELETE' THEN RETURN OLD; END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER immutable_approved_document BEFORE UPDATE OR DELETE ON "DocumentVersion" FOR EACH ROW EXECUTE FUNCTION protect_document_version();
CREATE FUNCTION validate_document_publication() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE doc "DocumentVersion"%ROWTYPE;
BEGIN
 SELECT * INTO doc FROM "DocumentVersion" WHERE id=NEW."documentId";
 IF NOT FOUND OR doc.type<>NEW.type OR doc."approvedAt" IS NULL OR doc."effectiveAt" IS NULL OR doc."effectiveAt">CURRENT_TIMESTAMP THEN
   RAISE EXCEPTION 'Document is not approved and effective';
 END IF;
 RETURN NEW;
END;
$$;
CREATE TRIGGER approved_document_publication BEFORE INSERT OR UPDATE ON "DocumentPublication" FOR EACH ROW EXECUTE FUNCTION validate_document_publication();
