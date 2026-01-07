import { Controller, Post, Body } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillDto } from './bill.dto';
import { BillResponseData } from './type';
import { Response } from '../types/response';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post('extract')
  async extract(@Body() body: BillDto): Promise<Response<BillResponseData>> {
    // 校验参数, 如果不存在，需要返回错误码给前端， 并提示用户输入账单文本内容，否则调用账单服务提取账单信息
    const message = body.message;
    if (!message) {
      return {
        code: 400,
        data: null,
        message: '文本内容不能为空',
      };
    }
    return this.billService.extract(message);
  }
}
