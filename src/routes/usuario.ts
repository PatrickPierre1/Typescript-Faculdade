import { Router, Request, Response } from "express";
import knex from "../database/knex";
import { Cipher } from "crypto";
import AppError from "../utils/AppError";
import { hash } from "bcrypt";
import { z } from "zod";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const usuarios = await knex("usuarios");

    res.json({ usuarios });
});

router.post("/", async (req: Request, res: Response) => {
    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        senha: z.string().min(6),
    });

    const obj = registerBodySchema.parse(req.body);

    obj.senha = await hash(obj.senha, 8);

    const id_usuario = await knex("usuarios").insert(obj);

    res.json({ message: "Usuario salvo com sucesso" });
});

router.put("/:id", async (req: Request, res: Response) => {
    const obj = req.body;
    const { id } = req.params;

    if (obj?.senha) {
        obj.senha = await hash(obj.senha, 8);
    }

    let usuario = await knex("usuarios").where({ id }).first();

    if (!usuario?.id) {
        throw new AppError("Usuario não encontrado");
    }
    //concatena o objeto
    usuario = {
        ...usuario,
        ...obj,
    };
    await knex("usuarios").update(usuario).where({ id: usuario.id });

    return res.json({
        message: "Editado usuario com sucesso!",
        usuario: usuario,
    });
});

router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    let usuario = await knex("usuarios").where({ id }).first();

    if (!usuario?.id) {
        throw new AppError("Usuario não encontrado");
    }

    await knex("usuarios").where({ id }).delete();

    return res.json({
        message: "Usuário deletado com sucesso!",
    });
});
export default router;
