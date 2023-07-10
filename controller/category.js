import CategoryModel from "../model/category.js";


export const addCategory = async (req, res) => {
    const { title } = req.body;
    try {
        const category = new CategoryModel({ title: title });
        const data = await category.save();
        return res.status(201).json({
            status: 201,
            message: "Success",
            data: data
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message,
            data: null
        });
    }
};

export const getCategory = async (req, res) => {
    try {
        const categories = await CategoryModel.find(req.query).select('-__v');
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: categories,
            length: categories.length
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message,
            data: null
        });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const categories = await CategoryModel.findByIdAndUpdate(req.params.id, req.body,
            { new: true });
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: categories,
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message,
            data: null
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        await CategoryModel.findByIdAndDelete(req.params.id);
        return res.status(204).json({
            status: 204,
            message: "Success"
        });
    } catch (error) {
        return res.status(404).json({
            status: 404,
            message: error.message,

        });
    }
};
