import express from 'express';
import { addTodo, deleteTodo, getTodo, updateTodo } from '../controller/todo.js';
import { addCategory, deleteCategory, getCategory, updateCategory } from '../controller/category.js';
import { protect } from '../utils/auth.js';
import { forgotPassword, login, register, resetPassword } from '../controller/user.js';

const routes = express.Router();

routes.post('/user/login', login).post('/user/register', register);
routes.route('/user/forgotPassword').post(forgotPassword);
routes.route('/user/resetPassword/:token').patch(resetPassword);

routes.post('/todo', protect, addTodo).get('/todo', protect, getTodo);
routes.patch('/todo/:id', protect, updateTodo).delete('/todo/:id', protect, deleteTodo);

routes.post('/category', protect, addCategory).get('/category', protect, getCategory);
routes.patch('/category/:id', protect, updateCategory).delete('/category/:id', protect, deleteCategory);


export default routes;



