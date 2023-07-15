-- CreateTable
CREATE TABLE "SchedulerSetting" (
    "pky" SERIAL NOT NULL,
    "ctm" BIGINT NOT NULL,
    "utm" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "enable" BOOLEAN NOT NULL,
    "hour" INTEGER NOT NULL,
    "minute" INTEGER NOT NULL,
    "frequency" INTEGER NOT NULL,
    "timestamp" BIGINT NOT NULL,

    CONSTRAINT "SchedulerSetting_pkey" PRIMARY KEY ("pky")
);
