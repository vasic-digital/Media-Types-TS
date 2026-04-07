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
- **NEVER** execute operations as `root` user
- **NEVER** elevate privileges for file operations
- **ALL** infrastructure commands MUST use user-level container runtimes (rootless podman/docker)
- **ALL** file operations MUST be within user-accessible directories
- **ALL** service management MUST be done via user systemd or local process management
- **ALL** builds, tests, and deployments MUST run as the current user

### Why This Matters
- **Security**: Prevents accidental system-wide damage
- **Reproducibility**: User-level operations are portable across systems
- **Safety**: Limits blast radius of any issues
- **Best Practice**: Modern container workflows are rootless by design

### When You See SUDO
If any script or command suggests using `sudo`:
1. STOP immediately
2. Find a user-level alternative
3. Use rootless container runtimes
4. Modify commands to work within user permissions

**VIOLATION OF THIS CONSTRAINT IS STRICTLY PROHIBITED.**

