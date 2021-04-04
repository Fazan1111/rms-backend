import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingController } from './billing.controller';
import { Billing } from './billing.entity';
import { BillingService } from './billing.service';
import { PayMethod } from './payMethod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Billing, PayMethod])],
  controllers: [BillingController],
  providers: [BillingService]
})
export class BillingModule {}
