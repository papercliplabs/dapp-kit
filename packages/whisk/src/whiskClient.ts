import { app } from ".";
import { hc } from "hono/client";

// this is a trick to calculate the type when compiling
const client = hc<typeof app>("");
export type WhiskClientType = typeof client;
export const whiskClient = (...args: Parameters<typeof hc>): WhiskClientType => hc<typeof app>(...args);
