import { Module } from '@nestjs/common';
import { PayMethodService } from './pay-method.service';
import { PayMethodController } from './pay-method.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayMethod } from 'src/billing/payMethod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PayMethod])],
  providers: [PayMethodService],
  controllers: [PayMethodController]
})
export class PayMethodModule {}
