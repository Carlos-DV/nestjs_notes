import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schemas/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';


@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

    async create(createTask: CreateTaskDto): Promise<Task>  {
        const newTask = new this.taskModel(createTask);
        return newTask.save();
    }

    async findAll(): Promise<Task[]>  {
        return await this.taskModel.find();
    }

    async findOne(id: string): Promise<Task>  {
        return this.taskModel.findById(id);
    }

    async updateTask(id: string, task: UpdateTaskDto) {
        return this.taskModel.findByIdAndUpdate(id, task, {new: true});
    }

    async deleteTask(id: string): Promise<Task> {
        return this.taskModel.findByIdAndDelete(id);
    }

}
