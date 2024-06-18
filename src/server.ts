import express from "express";
import "express-async-errors";
import routes from "./routes";
import AppError from "./utils/AppError";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import { ZodError } from "zod";
const app = express();

app.use(express.json());

const PORT = 3001;
app.use(
    cors({
        origin: "*",
    })
);

app.use(routes);


app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "Error",
            message: error.mensagem,
        });
    }
    if (error instanceof ZodError) {
        return res.status(400)
        .send({
            message:"Erro de validação",
            issues: error.format()
        })
        
    }

    return res.status(500).json({
        status: "Error",
        message: "Ocorreu um erro!",
    });
});

app.listen(PORT, () => {
    console.log(`Servidor utilizando a porta: ${PORT}`);
});
