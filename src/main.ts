import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const kafkaMicro:MicroserviceOptions={
    transport:Transport.KAFKA,
    options:{
      client:{
       brokers:['localhost:9092']
      },
      consumer:{
       groupId: 'user-consumer'
      }
    }
  }
  const app = await NestFactory.create(AppModule);
  await app.connectMicroservice(kafkaMicro)
  app.startAllMicroservices();
   app.enableShutdownHooks();
  await app.listen(3000);
}
bootstrap();
