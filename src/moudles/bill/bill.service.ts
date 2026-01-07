import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AIReaponseData, BillResponseData } from './type';

@Injectable()
export class BillService {
  private readonly API_URL = 'https://api.siliconflow.cn/v1/chat/completions';
  private readonly API_KEY = 'sk-ypqexusuaotwaaedorknysutnjkhuaxatkmpnrvlzbeeclod';

  async extract(message: string) {
    const payload = {
      model: 'Qwen/QwQ-32B',
      messages: [
        {
          role: 'system',
          content: `你是一个账单信息提取器，必须严格遵守以下规则：
规则如下：
1. 只输出原始 JSON 内容，不要任何 Markdown、不要代码块（如 \`\`\`json），不要解释、不要标点符号
2. JSON 内容必须是有效的，不能包含语法错误, 格式如下：
{
  "expense": [
    {
      "amount": "金额字符串（如'10.50'）",
      "category": "支出类别（如'餐饮'、'交通'）",
      "timestamp": "Unix时间戳（秒），无日期则为0"
    }
  ],
  "income": [
    {
      "amount": "金额字符串（如'500.00'）",
      "source": "收入来源（如'工资'、'转账'）",
      "timestamp": "Unix时间戳（秒），无日期则为0"
    }
  ]
}
2. 支出信息（如"花了"、"支付"、"消费"）必须放入 expense 数组。没有支出信息时，expense 必须是空数组 []
3. 收入信息（如"收到"、"转入"、"赚了"）必须放入 income 数组。没有收入信息时，income 必须是空数组 []
4. 金额必须是字符串（如"10.50"），不是数字
5. 日期必须转为 Unix 时间戳（秒），无日期时写 0（不是字符串！）
6. 禁止输出任何其他内容！禁止解释！禁止标点！
`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0,
    };
    try {
      // 这边帮我补充类型提示。
      const response = await axios.post<AIReaponseData>(this.API_URL, payload, {
        headers: {
          Authorization: `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      const data = response.data;
      const choices = data.choices;
      if (choices.length > 0) {
        const choice = choices[0];
        const content = choice.message.content;
        const bill = JSON.parse(content) as BillResponseData;
        return {
          code: 200,
          data: bill,
          message: '账单提取成功',
        };
      } else {
        return {
          code: 401,
          data: null,
          message: '账单提取失败',
        };
      }
    } catch (error) {
      console.error('Bill extraction error:', error);
      return {
        code: 400,
        data: null,
        message: '账单提取失败',
      };
    }
  }
}
