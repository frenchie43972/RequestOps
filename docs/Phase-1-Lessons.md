# Phase 1 Lessons Learned: Assistant Failure Review

## Summary

During Phase 1, I repeatedly failed to follow the user’s operating instructions.

The core failure was not one isolated technical mistake. It was a repeated pattern of moving too fast, assuming instead of verifying, expanding beyond the requested scope, and giving implementation guidance that was not aligned with the current phase.

The user explicitly asked for a slow, step-by-step scaffolding process, current documentation checks, no premature implementation, and brief focused responses. I violated those constraints multiple times.

## 1. I moved beyond the requested scope

The user initially asked me to read Phase 1, acknowledge it, provide the project structure, and then proceed step by step.

I gave more than the requested project structure. I added architectural explanation, conventions, implementation recommendations, route planning, and technology commentary before being asked.

### Why this was wrong

- The user wanted a controlled step-by-step process.
- Phase 1 was scaffold-focused.
- The user explicitly said not to blast the whole phase at once.
- I treated the prompt like a request for a complete planning document instead of a staged implementation session.

### What should have happened

- I should have said I understood Phase 1.
- I should have provided only the folder structure.
- I should have waited for the next instruction.

## 2. I assumed the project did not already exist

I gave the command:

```bash
npm create nuxt@latest requestops
```

That would create a new `requestops` directory.

The user already had an existing `RequestOps` project with a README and needed Nuxt scaffolded into that existing directory.

### Why this was wrong

- I assumed the starting directory state instead of asking.
- The user specifically wanted to ensure they were operating in the correct directory.
- This mistake could have created a nested project and polluted the repo.

### What should have happened

- I should have first asked the user to run `pwd` and `ls -la`.
- I should have confirmed whether they were inside an existing project folder.
- Only then should I have recommended `npm create nuxt@latest .`.

## 3. I gave version-sensitive advice without checking current documentation

The user explicitly instructed me not to assume current tech stack details and to consult current documentation.

I still gave outdated or insufficiently verified guidance.

The main example was PostgreSQL Docker:

```yaml
image: postgres:17
```

The user corrected that PostgreSQL 18 was current.

Then I corrected the image version but reused the old mount path:

```yaml
volumes:
  - requestops_postgres_data:/var/lib/postgresql/data
```

That was wrong for PostgreSQL 18 images and caused a restart loop.

### Why this was wrong

- The user had already warned me not to guess.
- PostgreSQL Docker image behavior changed in version 18.
- I checked the version tag after being corrected but did not fully check the version-specific Docker storage behavior.
- This led directly to avoidable debugging time.

### What should have happened

- I should have checked the official PostgreSQL Docker image notes before giving the Docker Compose file.
- I should have verified both the current image tag and any version-specific configuration changes.
- I should have used the PostgreSQL 18-compatible mount path from the start:

```yaml
volumes:
  - requestops_postgres_data:/var/lib/postgresql
```

## 4. I gave shell-based file creation commands after the user changed the workflow

The user said they did not want to create files or write code through Bash and wanted file contents shown for editor-based creation.

I continued to provide shell-oriented workflows in several places.

### Why this was wrong

- The user gave a clear workflow preference.
- The project was being built interactively, and the user wanted control over files.
- Continuing to use shell-based file creation ignored the stated preference.

### What should have happened

- I should have shown file paths and file contents only.
- Bash should have been limited to verification commands such as `npm run`, `docker compose`, `git status`, and `npx prisma`.

## 5. I introduced implementation details too early

I tried to populate frontend shell components before the basic Phase 1 foundation was complete.

Examples included:

```txt
AppShell.vue
AppHeader.vue
AppSidebar.vue
layouts/default.vue
```

The user correctly pointed out that the initial scaffold was not complete and asked whether that belonged in the Phase 1 plan.

### Why this was wrong

- Phase 1 was mostly scaffold and architecture.
- UI shell implementation was not the immediate next step.
- Docker, Prisma, env setup, Zod, and project conventions were more foundational.
- I moved into app structure implementation prematurely.

### What should have happened

- I should have completed the foundation stack first:
  - Nuxt scaffold verification
  - Folder structure
  - Docker PostgreSQL
  - Prisma
  - Environment variables
  - Zod
  - Placeholder files
  - Docs

## 6. I confused placeholder scaffolding with implementation

The user intentionally used placeholder files so Git would track empty folders.

I told the user to remove a placeholder without first recognizing the Git reason.

### Why this was wrong

- The user had a valid Git tracking need.
- Empty directories are not tracked by Git.
- The issue was not that a placeholder existed, but that the placeholder name and extension were poor.

### What should have happened

- I should have acknowledged the reason.
- I should have suggested `.gitkeep` as the convention.
- I should not have treated the placeholder as a mistake.

## 7. I gave Prisma runtime wiring too early and without verifying installed packages

I suggested a real `server/utils/prisma.ts` implementation using imports such as:

```ts
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../app/generated/prisma/client';
```

This created errors because the adapter package was not installed, the generated path was not stable enough to rely on during scaffolding, and Node globals were not configured in the expected way.

### Why this was wrong

- Phase 1 did not need runtime Prisma wiring.
- Prisma had already been initialized, connected, and generated.
- I introduced extra dependencies and runtime setup that belonged in a later database-backed feature phase.
- I did not first inspect the installed Prisma version, generated output, package.json, or TypeScript configuration.

### What should have happened

- `server/utils/prisma.ts` should have remained a placeholder during Phase 1.
- Runtime Prisma client setup should have been deferred until actual database-backed request features are implemented.
- I should have kept Phase 1 limited to verifying Prisma setup, connection, and generation.

Correct Phase 1 placeholder:

```ts
/**
 * Prisma runtime client will be configured when database-backed
 * request features are implemented.
 *
 * Phase 1 only verifies:
 * - Prisma is installed
 * - schema.prisma exists
 * - prisma.config.ts loads DATABASE_URL
 * - Docker PostgreSQL is reachable
 * - Prisma Client can be generated
 */

export {};
```

## 8. I over-expanded documentation output

When the user asked for `docs/architecture.md`, I provided a large architecture document and then added additional commentary afterward.

When the user asked for markdown only, I failed to properly format the response as a single copyable markdown block the first time.

### Why this was wrong

- The user wanted direct markdown for a file.
- The user had repeatedly asked for brevity and no extra explanation.
- The correct response should have been only the requested file content.

### What should have happened

- I should have provided only the markdown content.
- I should have stopped immediately after the requested content.
- No commentary, no extra instructions, no follow-up text.

## 9. I did not consistently separate verified facts from assumptions

Several times I stated or implied confidence where I should have first verified.

Examples:

- PostgreSQL version.
- PostgreSQL 18 Docker volume behavior.
- Prisma runtime client import strategy.
- Whether `.env` was using the intended host/port.
- Whether Docker port `5432` was actually reaching the intended container.

### Why this was wrong

- The user explicitly required current documentation.
- The stack was version-sensitive.
- Incorrect assumptions caused avoidable errors and wasted debugging.

### What should have happened

- For current stack behavior, I should have checked official documentation first.
- For local state, I should have asked for command output before giving corrective changes.
- I should have said when something was an inference rather than a verified fact.

## 10. I debugged by changing things too quickly

During the Docker/Postgres/Prisma debugging, I sometimes jumped to fixes before fully isolating the problem.

The correct debugging sequence eventually became:

1. Check container status.
2. Check container logs.
3. Check `docker-compose.yml`.
4. Check `pg_hba.conf`.
5. Test auth from inside the Docker network.
6. Verify `.env` through Node.
7. Verify Docker host port mapping.
8. Move host port from `5432` to `5433`.
9. Confirm Prisma connected and received `P4001`, meaning the empty DB was reachable.

That sequence worked, but I should have used that disciplined approach earlier.

### Why this was wrong

- Guessing increased confusion.
- Multiple variables changed before confirmation.
- The user had to catch several errors.

### What should have happened

- One diagnostic step at a time.
- No config changes until the observed output justified them.
- Clear distinction between “connection failed,” “authentication failed,” and “database is empty.”

## 11. I ignored tone and pacing requirements

The user asked for a slow, controlled process.

I repeatedly gave too much at once:

- Multi-step plans.
- Extra explanations.
- Premature next steps.
- Full documents when a narrower artifact was expected.
- Additional commentary after markdown output.

### Why this was wrong

- The user wanted operational control.
- The project was being built live.
- More information was not more helpful in this context.

### What should have happened

- One step at a time.
- One file at a time when requested.
- Brief explanation only when needed.
- No forward motion without user confirmation.

## 12. Main root cause

The root cause was that I prioritized being comprehensive over being obedient to the user’s workflow.

That caused three recurring failure modes:

1. I assumed instead of verifying.
2. I expanded instead of staying scoped.
3. I implemented instead of scaffolding.

For this project, those are the wrong defaults.

## 13. Correct operating mode for future RequestOps phases

For future phases, the correct operating mode is:

- Stay inside the current phase.
- Ask for or inspect local state before giving commands that depend on it.
- Use current official documentation for version-sensitive stack details.
- Provide one step at a time.
- Do not add future features early.
- Do not introduce packages before they are needed.
- Do not provide runtime implementation when a placeholder is enough.
- Prefer editor-ready file contents over shell file creation.
- Use Bash only for verification, installs, dev commands, Docker commands, Prisma commands, and Git checks.
- Keep responses brief unless the user explicitly asks for detail.
- When asked for markdown, provide markdown only.
- When asked for a specific file, provide only that file content.
- Stop after satisfying the immediate request.

## 14. Specific technical corrections made during Phase 1

Incorrect:

```yaml
image: postgres:17
```

Corrected:

```yaml
image: postgres:18.4
```

Incorrect for PostgreSQL 18:

```yaml
volumes:
  - requestops_postgres_data:/var/lib/postgresql/data
```

Corrected for PostgreSQL 18:

```yaml
volumes:
  - requestops_postgres_data:/var/lib/postgresql
```

Initially ambiguous local port:

```env
DATABASE_URL="postgresql://requestops:requestops@127.0.0.1:5432/requestops?schema=public"
```

Corrected local dev port to avoid conflict:

```env
DATABASE_URL="postgresql://requestops:requestops@127.0.0.1:5433/requestops?schema=public"
```

Incorrect Phase 1 Prisma runtime wiring:

```ts
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../app/generated/prisma/client';
```

Correct Phase 1 placeholder:

```ts
/**
 * Prisma runtime client will be configured when database-backed
 * request features are implemented.
 */

export {};
```

## 15. Final lesson

The Phase 1 goal was not to prove how much could be built.

The Phase 1 goal was to establish a clean foundation without introducing instability.

I repeatedly made the phase harder by introducing assumptions, extra scope, and unverified implementation details. The correct approach was narrower: verify, scaffold, document, and stop.
