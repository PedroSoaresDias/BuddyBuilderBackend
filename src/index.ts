import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./routers";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.get("/", (_req: Request, res: Response) => {
    res.send("Criado o backend do BuddyBuilder");
});

app.listen(PORT, () => {
    console.log(`Executando o backend`);
});