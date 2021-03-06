import { Module } from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceController } from './space.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Space } from './space.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Space])],
  providers: [SpaceService],
  controllers: [SpaceController]
})
export class SpaceModule {}
