import { Injectable } from "@nestjs/common/decorators";
import { Position } from "src/models/ship.position.model";

const satelites: Array<Position> =
    [
        { x: -500, y: -200 },
        { x: 100, y: -100 },
        { x: 500, y: 100 }
    ]

@Injectable()
export class PositionHelper {
      
    getLocation(distances: number[]): Position {

        let circle1 = this.getGeneralEcuationCircle(satelites[0],distances[0]);
        let circle2 = this.getGeneralEcuationCircle(satelites[1],distances[1]);
        let circle3 = this.getGeneralEcuationCircle(satelites[2],distances[2]);
//can't calculate position
        if(!circle1 || !circle2 || !circle3)
            return null

        //Use of substraction method
        //  x^2 + y^2 + ax + by + c = 0 
        // -x^2 - y^2 - dx - ey - f = 0 
        // --------------------------------------
        //  0  +  0  + (a-d)x + (b-e)y + c -f = 0
        let line1 = [circle1[0] - circle2[0], circle1[1] - circle2[1],circle1[2] - circle2[2]]
        let line2 = [circle2[0] - circle3[0], circle2[1] - circle3[1],circle2[2] - circle3[2]]
        
        return this.resolverSistema(line1, line2);     
    }


    //**
    //* (x-b)^2 = x^2 + "t"x + "u"
    // * @param b second part of the binmomial 
    // * @returns Array with numbers that represents t and u 
    // */
    binomialSquare(b: number): Array<number> {
        if (b) {
            const t = 2 * b * -1
            const u = b * b
            return [t, u]
        }
        return null
    }
  
    //**
    // x^2 + y^2 + Ux + Ty + V = 0
    // resolve binomial squares part and reorder to get general ecuation for circles
    // * @center Position of the cernter
    // * @radius distance to ship
    // */
    getGeneralEcuationCircle(center:Position, radius: number): Array<number> {
        if(!center || !radius)
            return null;
        let firstBinomial = this.binomialSquare(center.x)
        let secondBinomial = this.binomialSquare(center.y)
        let rest = firstBinomial[1] + secondBinomial[1] - Math.pow(radius, 2)

        let U = firstBinomial[0]
        let T = secondBinomial[0]
        let V = rest
        return [U, T, V]
    }

    resolverSistema(ecuation1: number[], ecuation2: number[]): { x: number, y: number } | null {       
        let a = ecuation1[0];
        let b = ecuation1[1];
        let c = ecuation1[2];
        let d = ecuation2[0];
        let e = ecuation2[1];
        let f = ecuation2[2];
        const det: number = a * e - b * d;
            
        if (det === 0) {
            console.log('El sistema no tiene solución única.');
            return null;
        }
        
        const x: number = ((c * e) - (b * f)) / det;
        const y: number = ((a * f) - (c * d)) / det;
    
        return { x, y };
    }
}