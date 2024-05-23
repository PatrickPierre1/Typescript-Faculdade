import { Router } from "express";
import usuarioRouter from "./usuario";
import categoriaRouter from "./categoria";

const routes = Router();

routes.use("/usuarios", usuarioRouter);
routes.use("/categorias", categoriaRouter);

export default routes;
