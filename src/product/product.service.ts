import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/share/BaseService';
import { Product } from './product.entity';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor() {
      super();
      this.repository = Product;
      this.entityName =  "product";
  }
}
