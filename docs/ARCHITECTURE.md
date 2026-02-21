# Architecture — @vasic-digital/media-types

## Overview

Pure TypeScript type definitions with zero runtime dependencies. Every interface maps 1:1 to a Catalogizer API response shape.

## Design Principles

- **Single Responsibility**: Each file owns one domain (auth, media, collections)
- **Interface Segregation**: Small, focused interfaces — never a monolithic "everything" type
- **Open/Closed**: Add new fields as optional; never remove or rename existing fields (breaking)
- **Zero Runtime**: All exports are `type` — no runtime code, pure declaration

## Design Patterns

- **Value Object**: All interfaces are immutable data shapes (no methods)
- **Repository Interface**: `PaginatedResponse<T>` is a generic contract for list endpoints
- **Template Method**: `MediaEntity` extends the simpler `MediaItem` concept with hierarchy fields

## Module Structure

```
src/
  auth.ts        — Authentication domain: User, Role, login/register payloads
  media.ts       — Media domain: MediaItem, MediaEntity, hierarchy, stats
  collections.ts — Collections domain: MediaCollection, SmartCollectionRule
  index.ts       — Barrel re-export of all types
```

## Dependency Graph

```
@vasic-digital/media-types
  └── (zero dependencies)
```

## Versioning Policy

- Patch (0.0.x): Add optional fields to existing interfaces
- Minor (0.x.0): Add new interfaces
- Major (x.0.0): Remove, rename, or change required fields
