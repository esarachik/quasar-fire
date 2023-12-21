import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PositionHelper } from './helpers/position.helper';
import { MessageHelper } from './helpers/message.helper';
import { MemoryDataService } from './helpers/memory.data.helper';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService,PositionHelper,MessageHelper,MemoryDataService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Quasar fire RUNNING!"', () => {
      expect(appController.healthCheck()).toBe('Quasar fire RUNNING!');
    });
  });
});
