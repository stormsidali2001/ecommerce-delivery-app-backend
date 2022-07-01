import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticatedGuard } from './common/guards/aurhenticatedGuard';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [  
    ConfigModule.forRoot({isGlobal:true}), 
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide:APP_GUARD,
      useClass:AuthenticatedGuard
    }
  ],
})
export class AppModule {}
