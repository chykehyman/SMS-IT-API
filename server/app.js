import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import mongodbConfig from './config';
import routes from './routes/index';

dotenv.config();

const app = express();
const env = process.env.NODE_ENV || 'development';
const port = env === 'test' ? 4001 : parseInt(process.env.PORT, 10) || 4000;

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongodbConfig(env);

app.get('/api/v1', (_, response) => {
  response.json({
    status: 'Success',
    message: 'Welcome to the SMS-IT API'
  });
});

app.use('/api/v1', routes);

app.all('*', (_, response) => {
  response.status(404).json({
    status: 'Failed',
    message: 'API route does not exist. Redirect to /api/v1'
  });
});

app.listen(port, () => console.log(`server started on port ${port}`));

export default app;
