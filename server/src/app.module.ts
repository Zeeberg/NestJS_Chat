import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { Message } from './chat/message.entity';
import { ChatModule } from './chat/chat.module';
import 'reflect-metadata'

@Module({
  imports:[
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'my_database',
      synchronize: true,
      autoLoadEntities: true,
      entities: [Users, Message],
    }),
    UsersModule,
    AuthModule,
    ChatModule],
})
export class AppModule {}
