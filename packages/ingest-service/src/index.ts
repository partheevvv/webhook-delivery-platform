import express from "express";
import { loadRootEnv } from "@app/shared";

loadRootEnv();

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true, service: "ingest" }));

const port = Number(process.env.INGEST_PORT ?? 4002);
app.listen(port, () => console.log(`[ingest-service] listening on :${port}`));