-- CreateTable
CREATE TABLE "Area" (
    "pky" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DECIMAL(65,30) NOT NULL,
    "long" DECIMAL(65,30) NOT NULL,
    "ctm" BIGINT NOT NULL,
    "utm" BIGINT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("pky")
);

-- CreateTable
CREATE TABLE "Camera" (
    "pky" SERIAL NOT NULL,
    "cameraId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DECIMAL(65,30) NOT NULL,
    "long" DECIMAL(65,30) NOT NULL,
    "ctm" BIGINT NOT NULL,
    "utm" BIGINT NOT NULL,
    "areaPky" INTEGER NOT NULL,

    CONSTRAINT "Camera_pkey" PRIMARY KEY ("pky")
);

-- CreateTable
CREATE TABLE "WeatherForecast" (
    "pky" SERIAL NOT NULL,
    "areaPky" INTEGER NOT NULL,
    "forecast" TEXT NOT NULL,
    "validFrom" BIGINT NOT NULL,
    "validTo" BIGINT NOT NULL,
    "isArchived" BOOLEAN NOT NULL,
    "ctm" BIGINT NOT NULL,
    "utm" BIGINT NOT NULL,

    CONSTRAINT "WeatherForecast_pkey" PRIMARY KEY ("pky")
);

-- CreateTable
CREATE TABLE "TrafficCapture" (
    "pky" SERIAL NOT NULL,
    "cameraPky" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL,
    "capturedTimestamp" BIGINT NOT NULL,
    "ctm" BIGINT NOT NULL,
    "utm" BIGINT NOT NULL,

    CONSTRAINT "TrafficCapture_pkey" PRIMARY KEY ("pky")
);

-- CreateIndex
CREATE UNIQUE INDEX "Area_name_key" ON "Area"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Camera_cameraId_key" ON "Camera"("cameraId");

-- AddForeignKey
ALTER TABLE "Camera" ADD CONSTRAINT "Camera_areaPky_fkey" FOREIGN KEY ("areaPky") REFERENCES "Area"("pky") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeatherForecast" ADD CONSTRAINT "WeatherForecast_areaPky_fkey" FOREIGN KEY ("areaPky") REFERENCES "Area"("pky") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrafficCapture" ADD CONSTRAINT "TrafficCapture_cameraPky_fkey" FOREIGN KEY ("cameraPky") REFERENCES "Camera"("pky") ON DELETE RESTRICT ON UPDATE CASCADE;
