import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response } from "express";
import Redis from "ioredis";

export type ApolloContext = {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session: { actorId?: number } };
  res: Response;
  redis: Redis;
};
