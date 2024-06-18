import { verify } from "jsonwebtoken";
import AppError from "../utils/AppError";
import AuthConfig from "../configs/auth";
import { NextFunction, Request, Response } from "express";

interface IToken {
    idUsuario: number
}

const autenticacao = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token invalido", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const dadosToken = <IToken> verify(token, AuthConfig.jwt.secret);
        req.user = { id: dadosToken.idUsuario };

        return next();
    } catch (error) {
        throw new AppError("Token invalido", 401);
    }
};
export default autenticacao;
