import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TokenInfoService } from './token-info.service';
import { TokenInfoController } from './token-info.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [TokenInfoController],
  providers: [TokenInfoService],
})
export class TokenInfoModule {}
