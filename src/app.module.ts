import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SupplierModule } from './supplier/supplier.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { SellModule } from './sell/sell.module';
import { CategoryModule } from './category/category.module';
import { BillingModule } from './billing/billing.module';
import { EmployeeModule } from './employee/employee.module';
import { AuthModule } from './auth/auth.module';
import { PurchaseModule } from './purchase/purchase.module';
import { PayMethodModule } from './pay-method/pay-method.module';
import { ReportModule } from './report/report.module';
import { ActivityLogModule } from './activity-log/activity-log.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    SupplierModule,
    CustomerModule,
    ProductModule,
    SellModule,
    CategoryModule,
    BillingModule,
    EmployeeModule,
    AuthModule,
    PurchaseModule,
    PayMethodModule,
    ReportModule,
    ActivityLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
