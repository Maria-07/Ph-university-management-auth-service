import { Application, Request, Response } from "express";
import cors from "cors";

import express from "express";
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//testing purpose
app.get("/", (req: Request, res: Response) => {
  res.send("Working successfully");
});

export default app;
