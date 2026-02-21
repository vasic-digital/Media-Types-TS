# @vasic-digital/media-types

Shared TypeScript type definitions for Catalogizer media entities, authentication, and collections API.

## Install

```bash
npm install @vasic-digital/media-types
```

## Usage

```typescript
import type { MediaEntity, LoginRequest, MediaCollection } from '@vasic-digital/media-types'

const login: LoginRequest = {
  username: 'admin',
  password: 'secret',
}

const entity: MediaEntity = {
  id: 1,
  title: 'Inception',
  status: 'active',
  first_detected: new Date().toISOString(),
  last_updated: new Date().toISOString(),
}
```

## Exports

### Auth (`auth.ts`)
- `Role` — user role with permissions
- `User` — authenticated user profile
- `DeviceInfo` — client device metadata
- `LoginRequest` / `LoginResponse` — login payload and response
- `RegisterRequest` — registration payload
- `AuthStatus` — current auth state
- `ChangePasswordRequest` / `UpdateProfileRequest` — profile management

### Media (`media.ts`)
- `MediaItem` — detected and cataloged media item
- `MediaEntity` — richer entity model with hierarchy support
- `MediaType` — enumeration entry from media_types table
- `MediaFile` — physical file linked to an entity
- `ExternalMetadata` / `EntityExternalMetadata` — provider-sourced metadata
- `UserMetadata` — user ratings, favorites, watch state
- `MediaVersion` — quality/format version of a media item
- `QualityInfo` — detected quality attributes
- `MediaSearchRequest` / `MediaSearchResponse` — search payloads
- `EntityStats` — aggregate dashboard counts
- `DuplicateGroup` — entities sharing title+type+year
- `PaginatedResponse<T>` — generic paginated list wrapper

### Collections (`collections.ts`)
- `MediaCollection` — named, user-curated set of media entities
- `SmartCollectionRule` — filter criterion (eq, ne, gt, lt, contains, not_contains)
- `CreateCollectionRequest` / `UpdateCollectionRequest` — collection CRUD payloads

## License

MIT
