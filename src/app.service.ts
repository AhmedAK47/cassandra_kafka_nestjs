import { InjectCassandra } from '@mich4l/nestjs-cassandra';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import * as cassandra from 'cassandra-driver';
import { Kafka } from 'kafkajs';
import {v1 as uuidv1} from 'uuid';
import * as rn from 'random-number';
@Injectable()
export class AppService {
  // client : cassandra.Client;
  // onModuleInit() {
  //   this.client =  new  cassandra.Client({
  //     contactPoints:['127.0.0.1:9042'],
  //     localDataCenter:'datacenter1',
  //     keyspace: 'test'
      
  //   })
  //   this.client.connect(function(error){;
  //   if(!error){
  //     console.log("Cassandra connected successfully");
  //   }
  //   });
  // }
   options = {
    node : [0x01,0x23,0x45,0x67,0x89,0xab],
    clocksec: 0x1234,
    msec : new Date(2022-5-31).getTime(),
    nsec:5678
   }
  constructor(
    @InjectCassandra()
    private readonly client: cassandra.Client,
    @Inject('Kafka-message') private readonly kafkaMaessage:ClientKafka,
    //@Inject() private mapper:cassandra.mapping.Mapper
  ){}
  async storage_file() {
    //return this.client.qu;
    let query = `select * from storage_file;`;
    const result = await this.client.execute(query,[]);
    this.kafkaMaessage.emit('allstorage_file',JSON.stringify(result.rows))
    return result.rows

  }

  async createstorage_file(data : any){
  
    console.log(uuidv1(this.options))
  let query = `insert into storage_file 
  (uuid,bucket,day_shard,day_shard_sourse,location_uuid,meta,owner_entity_type,owner_entity_uuid) values 
  (?,?,?,?,?,?,?,?);`
  const result = await this.client.execute(query,[uuidv1(this.options),data.bucket,data.day_shard,data.day_shard_sourse,uuidv1(this.options),data.meta,data.owner_entity_type,uuidv1(this.options)],{ prepare : true });
  this.kafkaMaessage.emit('createstorage_file',JSON.stringify({message:"Create Successfully"}))
  return result
  }
  async updatestorage_file(data :any){
    let query = `insert into storage_file 
     (uuid,bucket,day_shard,day_shard_sourse,location_uuid,meta,owner_entity_type,owner_entity_uuid) values 
     (?,?,?,?,?,?,?,?);`
     const result = await this.client.execute(query,[data.id,data.bucket,data.day_shard,data.day_shard_sourse,uuidv1(this.options),data.meta,data.owner_entity_type,uuidv1(this.options)],{ prepare : true });
    this.kafkaMaessage.emit('updatestorage_file',JSON.stringify({message:" Update Successfully"}))
    return result
  }

  async deletestorage_file(id:any){
   let query = `delete from storage_file where uuid = ?`;
   const result = await  this.client.execute(query,[id],{ prepare : true });
   this.kafkaMaessage.emit('deletestorage_file',JSON.stringify({message:"Delete Successfully"}))

   return result;
  }
}
