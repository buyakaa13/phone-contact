import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/router';
import { error_request_handler, route_not_found } from './controllers/handlers';

const application = express();

application.set('x-powered-by', false);
application.use(cors());
application.use(morgan('dev'));

//routes
application.use('/', router);

//error handlers
application.use(route_not_found);
application.use(error_request_handler);

application.listen(3000, ()=> console.log(`Application is listening on 3000`));