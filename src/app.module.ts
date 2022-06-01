import { CassandraModule } from '@mich4l/nestjs-cassandra';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CassandraModule.register({
    keyspace: 'test',
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1'
  }),
ClientsModule.register([{
  name:"Kafka-message",
  transport:Transport.KAFKA,
  options:{
    client:{
    clientId: "message",
    brokers: ['localhost:9092']
    },
    consumer:{
      groupId : "message-consumer"
    }
  }
}])
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
