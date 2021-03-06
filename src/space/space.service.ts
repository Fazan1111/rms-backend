import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/share/BaseService';
import { Space } from './space.entity';

@Injectable()
export class SpaceService extends BaseService<Space> {
  constructor() {
      super();
      this.repository = Space;
      this.entityName =  "space";
  }
}
