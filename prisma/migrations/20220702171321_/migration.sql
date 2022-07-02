-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_deliveryManId_fkey`;

-- AlterTable
ALTER TABLE `order` MODIFY `deliveryManId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_deliveryManId_fkey` FOREIGN KEY (`deliveryManId`) REFERENCES `DeliveryMan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
