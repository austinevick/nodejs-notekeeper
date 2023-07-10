import Todo from '../model/todo.js';


export const addTodo = async (req, res) => {

    try {
        const todo = new Todo(req.body);
        const data = await todo.save();
        if (todo) {
            return res.status(201).json({
                status: 201,
                message: "Success",
                data: data
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message,
            data: null
        });
    }
};

export const getTodo = async (req, res) => {

    try {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const skip = (page - 1) * limit;
        const todos = await Todo.find(req.query)
            .select('-__v').skip(skip).limit(limit);

        return res.status(200).json({
            status: 200,
            message: "Success",
            data: todos,
            length: todos.length
        });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            status: 400,
            message: error.message,
            data: null
        });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const todos = await Todo.findByIdAndUpdate(req.params.id, req.body,
            { new: true });
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: todos,

        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message,
            data: null
        });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const isExist = await Todo.findById(req.params.id);
        if (!isExist) {
            return res.status(404).json({
                status: 404,
                message: "There is no data with the given id"
            });
        }
        const result = await Todo.deleteOne({ _id: req.params.id });
        return res.status(204).json({
            status: 204,
            message: "Todo was successfully deleted",
            data: result
        });

    } catch (error) {
        return res.status(404).json({
            status: 404,
            message: error.message,

        });
    }
}

