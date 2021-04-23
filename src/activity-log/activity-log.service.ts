import { HttpException, HttpService, Injectable, Scope} from '@nestjs/common';
import { HttpCode } from 'src/enum/httpCode';
import { getManager, getRepository } from 'typeorm';
import { ActivityLog } from './activityLog.entity';

@Injectable({scope: Scope.REQUEST})
export class ActivityLogService {

    constructor(private httpService?: HttpService) {}
    protected entityName = 'activityLog';

    async addUserActivity(
        userId: number,
        module: string = '',
        method: string = ''
        
    ) {

        await getManager().transaction(async manager => {
            let activlityLog: ActivityLog = new ActivityLog();
            let action = '';
            if (method == 'Post') {
                action = 'Create';
            } else if (method == 'Put') {
                action = 'Update';
            } else if (method == 'Delete') {
                action = 'Delete';
            }
            
            activlityLog.userId = userId;
            activlityLog.method = method;
            activlityLog.module = module;
            activlityLog.description = ` ${action} ${module}`;

            await manager.save(ActivityLog, activlityLog);
        })
    }

    async getActivityLog() {
        const query = await getRepository(ActivityLog).createQueryBuilder(this.entityName)
        .leftJoinAndSelect(`${this.entityName}.user`, "User")
        .getMany();

        if (!query) {
            return new HttpException('No data found', HttpCode.NotFound);
        }

        return query;
    }
}
