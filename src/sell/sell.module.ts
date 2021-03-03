import { Module } from '@nestjs/common';
import { SellService } from './sell.service';
import { SellController } from './sell.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sell } from './sell.entity';
import SellItem from './sell-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sell, SellItem])],
  providers: [SellService],
  controllers: [SellController]
})
export class SellModule {}
