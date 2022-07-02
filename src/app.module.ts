import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthenticatedGuard } from './common/guards/aurhenticatedGuard';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { HttpErrorFilter } from './common/filters/http.error.filter';
import { LoggingInterceptor } from './common/filters/logging.interceptor';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [  
    ConfigModule.forRoot({isGlobal:true}), 
    AuthModule,
    ProductsModule,
    OrderModule
  ],
  controllers: [],
  providers: [
    {
      provide:APP_GUARD,
      useClass:AuthenticatedGuard
    },
    {
      provide:APP_FILTER,
      useClass:HttpErrorFilter
    },
    {
      provide:APP_INTERCEPTOR,
      useClass:LoggingInterceptor
    }
  ],
})
export class AppModule {}
