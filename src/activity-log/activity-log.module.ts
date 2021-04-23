import { HttpModule, Module } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { ActivityLogController } from './activity-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLog } from './activityLog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActivityLog]), 
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
  })
  ],
  providers: [ActivityLogService],
  controllers: [ActivityLogController]
})
export class ActivityLogModule {}
