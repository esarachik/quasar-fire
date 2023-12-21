import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PositionHelper } from './position.helper';
import { Position } from 'src/models/ship.position.model';

describe('PositionHelper', () => {
    let app: INestApplication;
    let positionHelper: PositionHelper;
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [PositionHelper],
        }).compile();

        positionHelper = moduleRef.get<PositionHelper>(PositionHelper);
    });

    it('binomialSquare basic test', () => {
        // (x-2)^2 = x^2 - 4x + 4
        const result = positionHelper.binomialSquare(2)
        expect(result[0]).toBe(-4);
        expect(result[1]).toBe(4);
    })

    it('binomialSquare negative basic test', () => {
        // (x-2)^2 = x^2 + 4x + 4
        const result = positionHelper.binomialSquare(-2)
        expect(result[0]).toBe(4);
        expect(result[1]).toBe(4);
    })

    it('binomialSquare null param', () => {
        const result = positionHelper.binomialSquare(null)
        expect(result).toBe(null);

    })

    it('getGeneralEcuationCircle basic test', () => {
        //should return x^2 + y^2 + "6"x "-10"y "-222" = 0 
        const center: Position = { x: -3, y: 5 }
        const result = positionHelper.getGeneralEcuationCircle(center, 16)
        expect(result[0]).toBe(6);
        expect(result[1]).toBe(-10);
        expect(result[2]).toBe(-222);
    })

    it('getGeneralEcuationCircle basic test 2', () => {
        //should return x^2 + y^2  "-20"x "-10"y + "109" = 0 
        const center: Position = { x: 10, y: 5 }
        const result = positionHelper.getGeneralEcuationCircle(center, 4)
        expect(result[0]).toBe(-20);
        expect(result[1]).toBe(-10);
        expect(result[2]).toBe(109);
    })

    it('getGeneralEcuationCircle some param null', () => {
        //should return null
        const center: Position = { x: 10, y: 5 }
        const result = positionHelper.getGeneralEcuationCircle(null, 4)
        expect(result).toBe(null)
    })

    it('getGeneralEcuationCircle other param null', () => {
        //should return null
        const center: Position = { x: 10, y: 5 }
        const result = positionHelper.getGeneralEcuationCircle(center, null)
        expect(result).toBe(null)
    })
  
    it('should add two numbers', () => {
        const result = positionHelper.getLocation([100, 200, 150]);
        // expect(result).toBe(5);
    });


});
