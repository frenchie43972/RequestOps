# RequestOps Architecture

## Purpose

RequestOps is an internal purchase approval request portal.

The v1 application is intentionally narrow. It supports a structured request review workflow for purchase approval requests:

1. A requester submits a purchase approval request.
2. A reviewer reviews the request.
3. The reviewer can approve, reject, or ask for changes.
4. The requester can respond when changes are requested.
5. The app records comments and status history.
6. An admin can later view all requests and export records.

RequestOps v1 is not a generic workflow builder, project management tool, task manager, SaaS platform, or automation engine.

## Stack

The project uses:

- Nuxt 4
- Vue 3 Composition API
- TypeScript
- PostgreSQL
- Prisma
- Zod
- Tailwind
- Nuxt UI
- Docker for local PostgreSQL

Auth will be decided in a later phase.

## High-Level Structure

```txt
app/
  Browser-facing Nuxt application code.

server/
  Backend API handlers, server utilities, and backend domain services.

shared/
  Code that can be safely used by both app/ and server/.

prisma/
  Prisma schema, migrations, and database configuration.

docker/
  Docker-specific supporting files.

docs/
  Project documentation and phase handoff notes.
```
