import { Router, Request, Response } from "express";
import knex from "../database/knex";
import AppError from "../utils/AppError";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    knex("categorias").then((categorias) => {
        res.json({ categorias });
    });
});

interface IDadosCategoria {
    nome: string;
}

router.post("/", async (req: Request, res: Response) => {
    const obj: IDadosCategoria = req.body;

    if (!obj?.nome) {
        throw new AppError("Nome é obrigatorio!");
    }

    const categoria = await knex("categorias").insert(obj);

    res.json({ message: "Categoria Salva" });
});

export default router;
