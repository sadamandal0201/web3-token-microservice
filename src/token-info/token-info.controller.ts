import {
  Controller,
  Get,
  Query,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { TokenInfoService } from './token-info.service';

@Controller('token-info')
export class TokenInfoController {
  constructor(private readonly tokenInfoService: TokenInfoService) {}

  @Get()
  async getTokenInfo(
    @Query('key') key: string,
  ) {
    if (!key) {
      throw new BadRequestException('Access key is required');
    }

    return this.tokenInfoService.getTokenInfo(key);
  }
}
