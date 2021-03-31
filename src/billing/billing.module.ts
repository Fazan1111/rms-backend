import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingController } from './billing.controller';
import { Billing } from './billing.entity';
import { BillingService } from './billing.service';

@Module({
  imports: [TypeOrmModule.forFeature([Billing])],
  controllers: [BillingController],
  providers: [BillingService]
})
export class BillingModule {}
