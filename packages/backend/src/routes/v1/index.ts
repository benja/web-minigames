import { Request, Response, Router } from 'express';
import { GameLobbySizes, GameTypes } from '@wmg/shared';
import * as yup from "yup";

export const api = Router();

api.get('/games', async (req: Request, res: Response) => {
  const { limit } = await querySchema.validate(req.query);

  return void res.json([
    {
      name: 'Draw it',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec lorem et ante pretium aliquam id pharetra metus. Aliquam erat volutpat. Proin in tellus ut odio mattis laoreet. Integer rutrum tellus ac ipsum fermentum, quis convallis turpis iaculis. Quisque vehicula lobortis tellus ut blandit. Sed vitae nibh dolor. Mauris rhoncus purus vitae egestas mollis. Aenean porta enim est. Fusce efficitur, est a fringilla mollis, libero elit varius diam, eget ultricies orci dui non leo. Proin vestibulum libero a leo iaculis interdum. Vestibulum non ex ut mauris faucibus congue sit amet non lorem. Maecenas libero nunc, tincidunt et ligula nec, tempus consectetur felis. Nullam tempor nisl quis sem volutpat, nec bibendum ex lacinia.',
      type: GameTypes.DRAWING,
      limit: GameLobbySizes[GameTypes.DRAWING],
      image: 'https://avatars.githubusercontent.com/u/16708653?s=400&u=b96a5b2534bdd50476bddf50d0290985b5888687&v=4',
    },
    {
      name: 'Draw it',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec lorem et ante pretium aliquam id pharetra metus. Aliquam erat volutpat. Proin in tellus ut odio mattis laoreet. Integer rutrum tellus ac ipsum fermentum, quis convallis turpis iaculis. Quisque vehicula lobortis tellus ut blandit. Sed vitae nibh dolor. Mauris rhoncus purus vitae egestas mollis. Aenean porta enim est. Fusce efficitur, est a fringilla mollis, libero elit varius diam, eget ultricies orci dui non leo. Proin vestibulum libero a leo iaculis interdum. Vestibulum non ex ut mauris faucibus congue sit amet non lorem. Maecenas libero nunc, tincidunt et ligula nec, tempus consectetur felis. Nullam tempor nisl quis sem volutpat, nec bibendum ex lacinia.',
      type: GameTypes.DRAWING,
      limit: GameLobbySizes[GameTypes.DRAWING],
      image: 'https://avatars.githubusercontent.com/u/16708653?s=400&u=b96a5b2534bdd50476bddf50d0290985b5888687&v=4',
    },
  ].filter(g => limit ? g.limit >= limit : true));
});

const querySchema = yup.object({
  limit: yup.number().notRequired()
}).required().noUnknown();
