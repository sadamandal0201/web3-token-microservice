import { Injectable, OnModuleInit, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class TokenInfoService implements OnModuleInit {
  private redisClient: RedisClientType;

  constructor(private configService: ConfigService) {
    this.redisClient = createClient({
      url: this.configService.get<string>(process.env.REDIS_URL),
    });
  }

  async onModuleInit() {
    await this.redisClient.connect();
  }

  async validateKey(key: string): Promise<boolean> {
    const exists = await this.redisClient.exists(key);
    return exists === 1;
  }

  async checkRateLimit(key: string): Promise<void> {
    const requests = await this.redisClient.hGet(key, 'requests');
    const rateLimit = await this.redisClient.hGet(key, 'rateLimit');

    if (parseInt(requests) >= parseInt(rateLimit)) {
      throw new BadRequestException('Rate limit exceeded');
    }

    await this.redisClient.hIncrBy(key, 'requests', 1);
  }

  async getTokenInfo(key: string): Promise<any> {
    if (!(await this.validateKey(key))) {
      throw new BadRequestException('Invalid or expired key');
    }

    await this.checkRateLimit(key);

    // Return mock token information
    const tokenInfo = {
      id: 'Token',
      name: 'Mock Token',
    };

    return tokenInfo;
  }
}
