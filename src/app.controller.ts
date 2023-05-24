import {
  BadRequestException,
  Controller,
  ExecutionContext,
  Get,
  createParamDecorator,
} from '@nestjs/common';
import { AppService } from './app.service';

export const TESTDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    /**
     * check switchToHttp work correctly.
     *
     * it work correctly.
     */
    // console.log(req, 'TEST Decorator http request');

    /**
     * maybe this error will be caught.
     */
    throw new BadRequestException({ code: 4000, message: 'Can filter catch?' });
    return 1;
  },
);

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@TESTDecorator() test: 1): string {
    return this.appService.getHello();
  }
}
