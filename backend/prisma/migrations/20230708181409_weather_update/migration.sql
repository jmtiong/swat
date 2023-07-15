/*
  Warnings:

  - You are about to drop the column `hour` on the `SchedulerSetting` table. All the data in the column will be lost.
  - Added the required column `lastUpdateTimestamp` to the `WeatherForecast` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SchedulerSetting" DROP COLUMN "hour";

-- AlterTable
ALTER TABLE "WeatherForecast" ADD COLUMN     "lastUpdateTimestamp" BIGINT NOT NULL;
