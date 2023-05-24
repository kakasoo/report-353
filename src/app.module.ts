import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { APP_FILTER, BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor() {
    super();
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    if (exception instanceof HttpException) {
      const response = ctx.getResponse<Response>();
      const responseBody = exception.getResponse() as Record<string, unknown>;
      const httpStatus = exception.getStatus();

      const { code, message, ...rest } = responseBody;

      return response
        .status(200)
        .json({ result: false, code: code || httpStatus, message, ...rest });
    }

    super.catch(exception, host);
  }
}

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}
