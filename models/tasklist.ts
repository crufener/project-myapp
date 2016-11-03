import * as mongoose from 'mongoose';

export interface ITask {
    name: string,
    done: boolean
}

export interface ITaskList extends mongoose.Document {
    name: string,
    isLoginedIn: boolean,
    tasks: ITask[]
}

let TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must enter a tasklist name'],
        minlength: [4, 'The task must be at least 4 characters long.'],
        maxlength: [30, 'The task should only be 30 characters long.']
    },
    done: {
        type: Boolean,
        default: false,
        required: true
    }
});

let TaskListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A name for your task list is required'],
        minlength: [2, 'Task list names must be at least 2 characters']
    },
    isLoginedIn: {
        type: Boolean,
        required: true,
        default: false
    },
    tasks: {
        type: [TaskSchema],
        required: true,
        default: {
            name: 'Something important to do.',
            done: false
        }
    }
});

export default mongoose.model<ITaskList>('TaskList', TaskListSchema);
