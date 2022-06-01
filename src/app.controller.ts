import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    ) {}

  @Get()
  getHello() {
    return this.appService.storage_file();
  }
  @Post('createstorage_file')
  createstorage_file(@Body() body) {
    return this.appService.createstorage_file(body);
  }
  @Post('updatestorage_file')
  updatestorage_file(@Body() body) {
    return this.appService.updatestorage_file(body);
  }
  
  @Post('deletestorage_file')
  deletestorage_file(@Body() body) {
    console.log(body.id)
    return this.appService.deletestorage_file(body.id);
  }
  @MessagePattern('user')
  user(data:any){ 
    console.log(data.value)
  }

}
