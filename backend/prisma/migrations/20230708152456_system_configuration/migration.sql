/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `SystemConfiguration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `module` to the `SystemConfiguration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SystemConfiguration" ADD COLUMN     "module" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SystemConfiguration_name_key" ON "SystemConfiguration"("name");
