import { Hono } from "hono";
import { identity } from "./identity";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

export const app = new Hono().use(cors()).use(logger()).route("/identity", identity);

export default {
    port: 3001,
    fetch: app.fetch,
};
