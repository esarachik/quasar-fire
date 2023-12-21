
import { Injectable } from '@nestjs/common';
import { PositionData} from '../models/ship.position.model';

@Injectable()
export class MemoryDataService {

    private satelites: Record<string, PositionData> = {
        Kenobi: { position: { x: -500, y: -200 }, data: null },
        Skywalker: { position: { x: 100, y: -100 }, data: null },
        Sato: { position: { x: 500, y: 100 }, data: null },
      };

    getData(name:string): any {
        return this.satelites[name].data;
    }
    
    getPosition (name:string): any {
        return this.satelites[name].position
    }

    setData(name:string, newData: any): void {
        if(!this.satelites[name])
            return
        this.satelites[name].data = newData;
    }
}