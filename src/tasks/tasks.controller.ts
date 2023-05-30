import { Controller, Get, Post, Delete, Put, Body, Param, ConflictException, NotFoundException, HttpCode} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    @Get()
    findAll() {
        // return 'all tasks';
        return this.taskService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string){
        const task = await this.taskService.findOne(id);
        if(!task) {
            throw new NotFoundException('Task not found');
        }
        return task;
    }

    @Post()
    async createTask(@Body() body: CreateTaskDto) {
        try {
            return await this.taskService.create(body);
        } catch (error) {
            if(error.code === 11000) {
                throw new ConflictException('Task already exists')
            }
            throw error;
        }

    }

    @Put(':id')
    async updateTask(@Param('id') id: string, @Body() body: UpdateTaskDto) {
        console.log(id, body)
        const taskUpdate = await this.taskService.updateTask(id, body);
        if(!taskUpdate) {
            throw new NotFoundException('Task not found');
        }
        // return taskUpdate;
        return { message: 'Task Updated'}
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteTask(@Param('id') id: string) {
         const task =  await this.taskService.deleteTask(id)
         if(!task) {
            throw new NotFoundException('Task not found');
        }
        return task;
    }

}
