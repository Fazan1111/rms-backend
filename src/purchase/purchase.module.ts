import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';
import { PurchaseItem } from './purchaseItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, PurchaseItem])],
  providers: [PurchaseService],
  controllers: [PurchaseController]
})
export class PurchaseModule {}
