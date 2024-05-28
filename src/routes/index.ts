import { Router } from "express";
import usuarioRouter from "./usuario";
import categoriaRouter from "./categoria";
import sessionRouter from "./session";

const routes = Router();

routes.use("/usuarios", usuarioRouter);
routes.use("/categorias", categoriaRouter);
routes.use("/session", sessionRouter);

export default routes;
