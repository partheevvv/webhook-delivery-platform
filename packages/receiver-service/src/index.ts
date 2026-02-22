import express from "express";
import { loadRootEnv } from "@app/shared";

loadRootEnv();

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true, service: "receiver" }));

const port = Number(process.env.RECEIVER_PORT ?? 4004);
app.listen(port, () => console.log(`[receiver-service] listening on :${port}`));