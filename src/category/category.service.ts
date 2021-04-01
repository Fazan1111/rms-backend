import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/share/BaseService';
import { getConnection, getRepository, Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService extends BaseService<Category> {
    constructor(){
      super();
      this.entityClass = Category;
      this.entityName =  "category";
    }
}
