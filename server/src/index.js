import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import handleError from './middlewares/globalErrorHandler.js';
import apiRoutes from './routes/index.routes.js';

const app = express();

app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: '*' }));

// Routes configurations
app.use('/', apiRoutes);

// Hosting the files
app.use(express.static("./public"))

// Handling errors in routes
// Whenever an error is encountered, this middleware will automatically catch it and return the response accordingly
app.use(handleError)


const port = process.env.SERVER_PORT || process.env.DEFAULT_PORT;
const db = process.env.MONGOURI;


mongoose
    .connect(db)
    .then(() => {
        app.listen(port, () => {
            console.log(
                `DB Connected and Server listening on port ${port} Successfully`
            );
        });
    })
    .catch((err) => {
        console.log(err);
    });

export default app;