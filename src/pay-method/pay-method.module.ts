import { Module } from '@nestjs/common';
import { PayMethodService } from './pay-method.service';
import { PayMethodController } from './pay-method.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [PayMethodService],
  controllers: [PayMethodController]
})
export class PayMethodModule {}
