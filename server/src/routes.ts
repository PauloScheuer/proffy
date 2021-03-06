import express from 'express';
import db from './database/connections';
import convertHourToMinutes from './utils/convertHourToMinutes';

import ClassesController from './controllers/classesController';
import ConnectionsController from './controllers/connectionsController';

const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

const routes = express.Router();

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);

export default routes;
