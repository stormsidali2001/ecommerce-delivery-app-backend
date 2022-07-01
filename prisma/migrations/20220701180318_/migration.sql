/*
  Warnings:

  - A unique constraint covering the columns `[ssn]` on the table `DeliveryMan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ssn` to the `DeliveryMan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `deliveryman` ADD COLUMN `ssn` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `DeliveryMan_ssn_key` ON `DeliveryMan`(`ssn`);
