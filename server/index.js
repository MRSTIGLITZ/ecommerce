import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

//db
mongoose
	.connect(process.env.MONGO_URI)		
	.then(() => console.log('DB CONNECTED'))
	.catch((err) => console.log('DB ERROR', err));

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//router middlewares
app.use('/api', authRoutes);

const port = process.env.PORT || 8000;
app.listen(port, function(){
    console.log(`Node server is running on port ${port}`)
});