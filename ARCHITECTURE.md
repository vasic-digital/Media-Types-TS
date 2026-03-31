# Architecture -- Media-Types-TS

## Purpose

Shared TypeScript type definitions for Catalogizer media entities, authentication, and collections API. Zero runtime dependencies -- all exports are TypeScript interfaces that are erased at compile time. Serves as the shared kernel consumed by all other TypeScript modules in the ecosystem.

## Structure

```
src/
  index.ts           Re-exports all types from auth, media, collections
  auth.ts            Authentication and user management types
  auth.test.ts       Auth type structural tests
  media.ts           Media entity, file, metadata, search, stats types
  media.test.ts      Media type structural tests
  collections.ts     Collection and smart rule types
  collections.test.ts  Collection type structural tests
```

## Key Components

- **Auth types** -- Role, User, DeviceInfo, LoginRequest/LoginResponse, RegisterRequest, AuthStatus, ChangePasswordRequest, UpdateProfileRequest
- **Media types** -- MediaItem (legacy flat), MediaEntity (rich with hierarchy via parent_id/children), MediaType, MediaFile, ExternalMetadata, UserMetadata, QualityInfo, MediaSearchRequest/Response, EntityStats, DuplicateGroup, PaginatedResponse<T>
- **Collection types** -- MediaCollection, SmartCollectionRule (field, operator, value), CreateCollectionRequest, UpdateCollectionRequest

## Data Flow

```
This is a types-only package. No runtime data flow.

Consumption: import type { MediaEntity, LoginRequest } from '@vasic-digital/media-types'
    |
    Used by: catalogizer-api-client, auth-context, media-browser, media-player,
             collection-manager, dashboard-analytics
```

## Dependencies

- Zero runtime dependencies
- `typescript` and `vitest` as dev dependencies only

## Testing Strategy

Vitest with type-level and structural assertions. Tests verify that type definitions compile correctly and that required fields are present in constructed objects. No runtime behavior to test.
