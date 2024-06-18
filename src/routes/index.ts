import { Router } from "express";
import usuarioRouter from "./usuario";
import categoriaRouter from "./categoria";
import sessionRouter from "./session";
import autenticacao from "../middlewares/autenticacao";

const routes = Router();

routes.use("/session", sessionRouter);

routes.use("/usuarios", usuarioRouter);
routes.use(autenticacao);
routes.use("/categorias", autenticacao, categoriaRouter);

export default routes;
