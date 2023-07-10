import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
},
    {
        timestamps: true
    }
);
const CategoryModel = mongoose.model('Category', categorySchema);

export default CategoryModel;