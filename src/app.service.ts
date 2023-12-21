import { Injectable } from '@nestjs/common';
import { Position } from './models/ship.position.model';
import { PositionHelper } from './helpers/position.helper';
import { MessageHelper } from './helpers/message.helper';
import { MemoryDataService } from './helpers/memory.data.helper';

@Injectable()
export class AppService {
  constructor(
    private readonly positionHelper: PositionHelper, 
    private readonly messageHelper: MessageHelper, 
    private readonly memoryDataService: MemoryDataService,     
    ) {}

  healthCheck(): string {
    return 'Quasar fire RUNNING!';
  }

  getLocation(distances: number[]):Position {    
    return this.positionHelper.getLocation(distances)
  }

  getMessage(array1: string[], array2: string[], array3: string[]):Array<string>{
    return this.messageHelper.getMessage(array1,array2,array3)
  }

  topSecretSplitPost(name:string, newData:any){
    return this.memoryDataService.setData(name,newData)
  }
  topSecretSplitGet(){    
    const kenobi = this.memoryDataService.getData("Kenobi")
    const skywalker = this.memoryDataService.getData("Skywalker")
    const sato = this.memoryDataService.getData("Sato")

    if (!kenobi || !skywalker || !sato) return null
    return [ kenobi,skywalker,sato]
  }
}
