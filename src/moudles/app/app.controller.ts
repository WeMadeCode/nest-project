import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// @Controller()：控制器装饰器
// 用于定义一个控制器类，负责接收和处理客户端的 HTTP 请求，是 NestJS 处理请求的入口。path参数为路由前缀，
// 所有该控制器内的路由都会自动带上这个前缀。
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()：GET 请求装饰器
  // 用于定义一个处理 HTTP GET 请求的路由处理方法。path参数为路由路径，默认值为空字符串。
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
