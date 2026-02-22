import express from "express";
import { loadRootEnv } from "@app/shared";

loadRootEnv();

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true, service: "auth" }));

const port = Number(process.env.AUTH_PORT ?? 4001);
app.listen(port, () => console.log(`[auth-service] listening on :${port}`));