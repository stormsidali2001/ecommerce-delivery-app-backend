import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticatedGuard } from './common/guards/aurhenticatedGuard';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide:APP_GUARD,
      useClass:AuthenticatedGuard
    }
  ],
})
export class AppModule {}
