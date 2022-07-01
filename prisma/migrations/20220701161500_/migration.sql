/*
  Warnings:

  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `DeliveryMan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `DeliveryMan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `DeliveryMan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `deliveryman` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `dob` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `username`;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
