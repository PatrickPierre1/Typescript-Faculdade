import express from "express";
import routes from './routes';

const app = express();

app.use(express.json());

const PORT = 3001;

app.use(routes);

app.listen(PORT,()=>{
    console.log(`Servidor utilizando a porta: ${PORT}`);
});

