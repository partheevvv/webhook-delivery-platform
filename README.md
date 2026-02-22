# Webhook Delivery Platform

A microservices-style backend system for **reliable webhook delivery**—similar in spirit to Stripe/Svix.  
It provides an API to register webhook endpoints, ingest events, and deliver them asynchronously with strong reliability patterns (retries, signing, idempotency) and full delivery observability.

> Status: **In progress** (actively being built). Current repo already includes the monorepo + local infrastructure + service scaffolding; features are being added incrementally.

---

## Why this project
Webhook delivery looks simple (“POST JSON to a URL”) but real-world implementations require:
- asynchronous delivery with backpressure
- retries and exponential backoff
- request signing + replay protection
- idempotency and deduplication
- delivery attempt tracking + observability

This project is built to demonstrate production-oriented backend skills around those problems.

---

## Planned core capabilities
- **Multi-tenant** model (apps/tenants + API keys)
- **Endpoint management** (register URLs + secrets + subscribed event types)
- **Event ingest API** with **idempotency keys**
- **Asynchronous delivery** via Redis queue + workers
- **Webhook signing** (HMAC SHA-256 + timestamp)
- **Retries** with exponential backoff + attempt logs
- **Replay** failed or historical events
- **Operational visibility**: delivery metrics + per-endpoint health

---

## Architecture (high level)

```mermaid
flowchart LR
  Producer[Producer App] -->|POST /events| Ingest[Ingest Service]
  Ingest -->|store| PG[(PostgreSQL)]
  Ingest -->|enqueue jobs| Redis[(Redis / BullMQ)]
  Redis --> Worker[Delivery Worker]
  Worker -->|POST webhook + signature| Endpoint[Customer Endpoint]
  Worker -->|attempt logs| PG
  Admin[Admin/Dev] -->|API| Auth[Auth Service]
  Ingest -->|verify API key| Auth
