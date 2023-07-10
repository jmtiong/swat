-- CreateTable
CREATE TABLE "SystemConfiguration" (
    "pky" SERIAL NOT NULL,
    "ctm" BIGINT NOT NULL,
    "utm" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "SystemConfiguration_pkey" PRIMARY KEY ("pky")
);
