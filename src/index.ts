import { PrismaClient } from '@prisma/client'
import express from 'express'
import {db} from './database';
import dishRouter from './routes/dish';
import categoryRouter from './routes/category';
import portionRouter from './routes/portion';
import fileupload from 'express-fileupload';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(fileupload());
app.use(express.urlencoded({extended: true}));
app.use(dishRouter);
app.use(portionRouter);
app.use(categoryRouter);

app.listen(3020, () =>
  console.log('REST API server ready at: http://localhost:3020')
);