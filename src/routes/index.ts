import { Router } from 'express';
import usuarioRouter from './usuario';

const routes = Router();

routes.use('/usuarios', usuarioRouter);

export default routes;