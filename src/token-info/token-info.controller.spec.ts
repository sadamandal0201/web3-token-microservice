import { Test, TestingModule } from '@nestjs/testing';
import { TokenInfoController } from './token-info.controller';
import { TokenInfoService } from './token-info.service';
import { BadRequestException } from '@nestjs/common';

describe('TokenInfoController', () => {
  let controller: TokenInfoController;
  let tokenInfoService: TokenInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenInfoController],
      providers: [
        {
          provide: TokenInfoService,
          useValue: {
            getTokenInfo: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TokenInfoController>(TokenInfoController);
    tokenInfoService = module.get<TokenInfoService>(TokenInfoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTokenInfo', () => {
    it('should return token information', async () => {
      const mockTokenInfo = {
        tokenName: 'Example Token',
        symbol: 'EXM',
        price: 100,
      };
      const key = 'valid-access-key';
      jest.spyOn(tokenInfoService, 'getTokenInfo').mockResolvedValue(mockTokenInfo);

      const result = await controller.getTokenInfo(key); // Pass key directly as a string

      expect(result).toEqual(mockTokenInfo);
      expect(tokenInfoService.getTokenInfo).toHaveBeenCalledWith(key);
    });

    it('should throw BadRequestException if key is missing', async () => {
      const key = ''; // Invalid key

      await expect(controller.getTokenInfo(key)).rejects.toThrowError(BadRequestException);
    });
  });
});
