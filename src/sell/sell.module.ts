import { Module } from '@nestjs/common';
import { SellService } from './sell.service';
import { SellController } from './sell.controller';

@Module({
  providers: [SellService],
  controllers: [SellController]
})
export class SellModule {}
