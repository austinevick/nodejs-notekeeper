import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    }
},
    {
        timestamps: true
    }
);
const Todo = mongoose.model('Todo', todoSchema);
export default Todo;