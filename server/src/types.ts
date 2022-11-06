import { Request, Response } from "express";
import Redis from "ioredis";

export type ApolloContext = {
  req: Request & { session: { actorId?: number } };
  res: Response;
  redis: Redis;
};
