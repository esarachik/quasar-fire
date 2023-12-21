import { BadRequestException, Body, Controller, Get, HttpCode, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import {  Satelite, Satelites } from './models/satelite';
import { TopSecretResponse } from './models/top.secret.response';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('health-check')
  healthCheck(): string {
    return this.appService.healthCheck();
  }

  @Post('topsecret')
  @HttpCode(200)
  topSecret(@Body() satelitesList: Satelites): TopSecretResponse {
    if (!satelitesList) 
        throw new BadRequestException('Invalid Input');    

    const shipPosition = this.appService.getLocation(satelitesList.satelites.map(item => item.distance))
    const message = this.appService.getMessage(
      satelitesList.satelites[0].message,
      satelitesList.satelites[1].message,
      satelitesList.satelites[2].message);
    
    if (!shipPosition || !message)
       throw new NotFoundException(null)
    
    return {
      position: shipPosition,
      message: message.join(' ').trim()
    }    
  }


  @Post('topsecret_split/:name')
  @HttpCode(200)
  topSecretSplitPost(@Param('name')name: string, @Body() satelite: Satelite): any {
    if (!name || !satelite) 
        throw new BadRequestException('Invalid Input');    
    this.appService.topSecretSplitPost(name,satelite)   
    return {
      name,
      satelite
    }
  }

  @Get('topsecret_split')  
  topSecretSplitGet(): any {    
    const result = this.appService.topSecretSplitGet()
    if (!result)
      return {data: "Can't give a result"}
    // const shipPosition = this.appService.getLocation(satelitesList.satelites.map(item => item.distance))
    // const message = this.appService.getMessage(
    //   satelitesList.satelites[0].message,
    //   satelitesList.satelites[1].message,
    //   satelitesList.satelites[2].message);
    
    // if (!shipPosition || !message)
    //    throw new NotFoundException(null)
    
    // return {
    //   position: shipPosition,
    //   message: message.join(' ').trim()
    // }    
    return result
  }
}
