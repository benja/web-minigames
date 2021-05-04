import { Request, Response, Router } from "express";
import { GameTypes } from "@wmg/shared";


export const api = Router();

api.get("/games", (req: Request, res: Response) => {
  return void res.json([
    {
      name: 'This is a game name',
      description: 'This is a description of a game pepehands',
      type: GameTypes.DRAWING,
      image: 'https://avatars.githubusercontent.com/u/16708653?s=400&u=b96a5b2534bdd50476bddf50d0290985b5888687&v=4',
    },
  ])
})
