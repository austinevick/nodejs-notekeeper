import express from "express";
import dotenv from "dotenv";
import connection from "./config/db.js";
import routes from "./routes/routes.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.raw());
app.use('/api', routes);
app.use(express.urlencoded({ extended: true }));



const port = process.env.PORT || 5000;
app.listen(port, async () => {
    await connection();
    console.log(`server running on port ${ port }`);
});