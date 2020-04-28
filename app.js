import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import productRoutes from "./routes/product.routes.js";
import users from'./users-data';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/users', (req, res)=> {

    res.status(200).json(users);
});

productRoutes(app);

app.listen(port, (err) => {
    if(err){
        return err.message;
    }else{
        console.log(`server running on port ${port}`);
    }
})