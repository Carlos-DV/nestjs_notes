import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://root:carlos12@cluster0.yjm246n.mongodb.net/tasksnest'),
    TasksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
