import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"


@Schema({
    timestamps: true
})

export class Task {
    @Prop({ 
        unique: true,
        required: true,
        trim: true,
    })
    title: string;

    @Prop({ 
        unique: true,
        required: true,
        trim: true,
    })
    description: string

    @Prop({ default: false})
    status: boolean
}

export const TaskSchema = SchemaFactory.createForClass(Task);

