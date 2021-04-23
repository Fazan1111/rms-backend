import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ActivityLogService } from './activity-log.service';

@Controller('activity-log')
export class ActivityLogController {
    constructor(private service: ActivityLogService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/lists')
    async list() {
        return this.service.getActivityLog();
    }
}
