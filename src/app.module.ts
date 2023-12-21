import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PositionHelper } from './helpers/position.helper';
import { MessageHelper } from './helpers/message.helper';
import { MemoryDataService } from './helpers/memory.data.helper';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,PositionHelper,MessageHelper,MemoryDataService],
})
export class AppModule {}
