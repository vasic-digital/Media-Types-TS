# CLAUDE.md - Media-Types-TS

## Overview

Shared TypeScript type definitions for Catalogizer media entities, authentication, collections, and API payloads. Zero runtime dependencies -- types only.

**Package**: `@vasic-digital/media-types`

## Build & Test

```bash
npm install
npm run build        # tsc
npm run test         # vitest run
npm run lint         # tsc --noEmit
npm run clean        # rm -rf dist
```

## Code Style

- TypeScript strict mode
- Interface-first design (no classes, no enums)
- PascalCase type names
- JSDoc comments on every exported interface
- Tests: Vitest (type-level and structural assertions)

## Package Structure

| Path | Purpose |
|------|---------|
| `src/index.ts` | Re-exports all types from auth, media, collections |
| `src/auth.ts` | Authentication and user management types |
| `src/auth.test.ts` | Auth type tests |
| `src/media.ts` | Media entity, file, metadata, search, stats types |
| `src/media.test.ts` | Media type tests |
| `src/collections.ts` | Collection and smart rule types |
| `src/collections.test.ts` | Collection type tests |

## Key Exports

### Auth (`src/auth.ts`)
- `Role` -- User role with id, name, description, permissions array, is_system flag
- `User` -- Authenticated user profile with role reference
- `DeviceInfo` -- Client device metadata for login
- `LoginRequest` / `LoginResponse` -- Login payload and response (session_token, refresh_token, expires_at)
- `RegisterRequest` -- Registration payload
- `AuthStatus` -- Current auth state (authenticated flag, user, permissions)
- `ChangePasswordRequest` / `UpdateProfileRequest` -- Profile management payloads

### Media (`src/media.ts`)
- `MediaItem` -- Detected and cataloged media item (legacy flat model)
- `MediaEntity` -- Rich entity model with hierarchy support (parent_id, season_number, episode_number, track_number), optional children, media_type, files, external_metadata, user_metadata
- `MediaType` -- Enumeration entry from media_types table (name, description, detection_patterns, metadata_providers)
- `MediaFile` -- Physical file linked to a MediaEntity (file_path, file_size, file_hash, is_primary)
- `ExternalMetadata` / `EntityExternalMetadata` -- Provider-sourced metadata (TMDB, IMDB, etc.)
- `UserMetadata` -- User ratings, favorites, watch state
- `MediaVersion` -- Quality/format version of a media item
- `QualityInfo` -- Detected quality attributes (resolution, codec, bitrate, score)
- `MediaSearchRequest` / `MediaSearchResponse` -- Search payloads with filtering and pagination
- `EntityStats` -- Aggregate dashboard counts (total_entities, entities_by_type, total_files, total_size, recent_additions, duplicate_groups)
- `DuplicateGroup` -- Entities sharing title + type + year
- `PaginatedResponse<T>` -- Generic paginated list wrapper (items, total, limit, offset)

### Collections (`src/collections.ts`)
- `MediaCollection` -- Named, user-curated set of media entities with optional smart rules
- `SmartCollectionRule` -- Filter criterion: field, operator (eq/ne/gt/lt/contains/not_contains), value
- `CreateCollectionRequest` / `UpdateCollectionRequest` -- Collection CRUD payloads

## Dependencies

- **None** -- This package has zero runtime dependencies. Only `typescript` and `vitest` as dev dependencies.

## Design Patterns

- **Shared kernel**: Central type definitions consumed by all other TypeScript modules in the Catalogizer ecosystem
- **Interface-only**: No runtime code; all exports are TypeScript interfaces (erased at compile time)
- **Generic pagination**: `PaginatedResponse<T>` provides a reusable wrapper for all paginated API responses
- **Self-referential hierarchy**: `MediaEntity.children` and `MediaEntity.parent_id` support arbitrary nesting (TV Show -> Season -> Episode, Artist -> Album -> Song)

## Consumers

All other TypeScript/React submodules depend on this package:
- `@vasic-digital/catalogizer-api-client`
- `@vasic-digital/auth-context`
- `@vasic-digital/collection-manager`
- `@vasic-digital/dashboard-analytics`
- `@vasic-digital/media-browser`
- `@vasic-digital/media-player`

## Commit Style

Conventional Commits: `feat(media-types): description`


## ⚠️ MANDATORY: NO SUDO OR ROOT EXECUTION

**ALL operations MUST run at local user level ONLY.**

This is a PERMANENT and NON-NEGOTIABLE security constraint:

- **NEVER** use `sudo` in ANY command
- **NEVER** use `su` in ANY command
- **NEVER** execute operations as `root` user
- **NEVER** elevate privileges for file operations
- **ALL** infrastructure commands MUST use user-level container runtimes (rootless podman/docker)
- **ALL** file operations MUST be within user-accessible directories
- **ALL** service management MUST be done via user systemd or local process management
- **ALL** builds, tests, and deployments MUST run as the current user

### Container-Based Solutions
When a build or runtime environment requires system-level dependencies, use containers instead of elevation:

- **Use the `Containers` submodule** (`https://github.com/vasic-digital/Containers`) for containerized build and runtime environments
- **Add the `Containers` submodule as a Git dependency** and configure it for local use within the project
- **Build and run inside containers** to avoid any need for privilege escalation
- **Rootless Podman/Docker** is the preferred container runtime

### Why This Matters
- **Security**: Prevents accidental system-wide damage
- **Reproducibility**: User-level operations are portable across systems
- **Safety**: Limits blast radius of any issues
- **Best Practice**: Modern container workflows are rootless by design

### When You See SUDO
If any script or command suggests using `sudo` or `su`:
1. STOP immediately
2. Find a user-level alternative
3. Use rootless container runtimes
4. Use the `Containers` submodule for containerized builds
5. Modify commands to work within user permissions

**VIOLATION OF THIS CONSTRAINT IS STRICTLY PROHIBITED.**



## Universal Mandatory Constraints

These rules are inherited from the cross-project Universal Mandatory Development Constraints (canonical source: `/tmp/UNIVERSAL_MANDATORY_RULES.md`, derived from the HelixAgent root `CLAUDE.md`). They are non-negotiable across every project, submodule, and sibling repository. Project-specific addenda are welcome but cannot weaken or override these.

### Hard Stops (permanent, non-negotiable)

1. **NO CI/CD pipelines.** No `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`, `.travis.yml`, `.circleci/`, or any automated pipeline. No Git hooks either. All builds and tests run manually or via Makefile / script targets.
2. **NO HTTPS for Git.** SSH URLs only (`git@github.com:…`, `git@gitlab.com:…`, etc.) for clones, fetches, pushes, and submodule operations. Including for public repos. SSH keys are configured on every service.
3. **NO manual container commands.** Container orchestration is owned by the project's binary / orchestrator (e.g. `make build` → `./bin/<app>`). Direct `docker`/`podman start|stop|rm` and `docker-compose up|down` are prohibited as workflows. The orchestrator reads its configured `.env` and brings up everything.

### Mandatory Development Standards

1. **100% Test Coverage.** Every component MUST have unit, integration, E2E, automation, security/penetration, and benchmark tests. No false positives. Mocks/stubs ONLY in unit tests; all other test types use real data and live services.
2. **Challenge Coverage.** Every component MUST have Challenge scripts (`./challenges/scripts/`) validating real-life use cases. No false success — validate actual behavior, not return codes.
3. **Real Data.** Beyond unit tests, all components MUST use actual API calls, real databases, live services. No simulated success. Fallback chains tested with actual failures.
4. **Health & Observability.** Every service MUST expose health endpoints. Circuit breakers for all external dependencies. Prometheus / OpenTelemetry integration where applicable.
5. **Documentation & Quality.** Update `CLAUDE.md`, `AGENTS.md`, and relevant docs alongside code changes. Pass language-appropriate format/lint/security gates. Conventional Commits: `<type>(<scope>): <description>`.
6. **Validation Before Release.** Pass the project's full validation suite (`make ci-validate-all`-equivalent) plus all challenges (`./challenges/scripts/run_all_challenges.sh`).
7. **No Mocks or Stubs in Production.** Mocks, stubs, fakes, placeholder classes, TODO implementations are STRICTLY FORBIDDEN in production code. All production code is fully functional with real integrations. Only unit tests may use mocks/stubs.
8. **Comprehensive Verification.** Every fix MUST be verified from all angles: runtime testing (actual HTTP requests / real CLI invocations), compile verification, code structure checks, dependency existence checks, backward compatibility, and no false positives in tests or challenges. Grep-only validation is NEVER sufficient.
9. **Resource Limits for Tests & Challenges (CRITICAL).** ALL test and challenge execution MUST be strictly limited to 30-40% of host system resources. Use `GOMAXPROCS=2`, `nice -n 19`, `ionice -c 3`, `-p 1` for `go test`. Container limits required. The host runs mission-critical processes — exceeding limits causes system crashes.
10. **Bugfix Documentation.** All bug fixes MUST be documented in `docs/issues/fixed/BUGFIXES.md` (or the project's equivalent) with root cause analysis, affected files, fix description, and a link to the verification test/challenge.
11. **Real Infrastructure for All Non-Unit Tests.** Mocks/fakes/stubs/placeholders MAY be used ONLY in unit tests (files ending `_test.go` run under `go test -short`, equivalent for other languages). ALL other test types — integration, E2E, functional, security, stress, chaos, challenge, benchmark, runtime verification — MUST execute against the REAL running system with REAL containers, REAL databases, REAL services, and REAL HTTP calls. Non-unit tests that cannot connect to real services MUST skip (not fail).
12. **Reproduction-Before-Fix (CONST-032 — MANDATORY).** Every reported error, defect, or unexpected behavior MUST be reproduced by a Challenge script BEFORE any fix is attempted. Sequence: (1) Write the Challenge first. (2) Run it; confirm fail (it reproduces the bug). (3) Then write the fix. (4) Re-run; confirm pass. (5) Commit Challenge + fix together. The Challenge becomes the regression guard for that bug forever.
13. **Concurrent-Safe Containers (Go-specific, where applicable).** Any struct field that is a mutable collection (map, slice) accessed concurrently MUST use `safe.Store[K,V]` / `safe.Slice[T]` from `digital.vasic.concurrency/pkg/safe` (or the project's equivalent primitives). Bare `sync.Mutex + map/slice` combinations are prohibited for new code.

### Definition of Done (universal)

A change is NOT done because code compiles and tests pass. "Done" requires pasted terminal output from a real run, produced in the same session as the change.

- **No self-certification.** Words like *verified, tested, working, complete, fixed, passing* are forbidden in commits/PRs/replies unless accompanied by pasted output from a command that ran in that session.
- **Demo before code.** Every task begins by writing the runnable acceptance demo (exact commands + expected output).
- **Real system, every time.** Demos run against real artifacts.
- **Skips are loud.** `t.Skip` / `@Ignore` / `xit` / `describe.skip` without a trailing `SKIP-OK: #<ticket>` comment break validation.
- **Evidence in the PR.** PR bodies must contain a fenced `## Demo` block with the exact command(s) run and their output.
