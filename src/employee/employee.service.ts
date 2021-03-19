import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/share/BaseService';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService extends BaseService<Employee> {

    constructor() {
        super();
        this.entityClass = Employee;
        this.entityName =  "employee";
    }

}
