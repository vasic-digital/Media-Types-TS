# AGENTS.md - Media-Types-TS Multi-Agent Coordination

## Module Identity

- **Package**: `@vasic-digital/media-types`
- **Role**: Shared TypeScript type definitions for media entities, authentication, and collections
- **Runtime Dependencies**: None (types only, erased at compile time)
- **TypeScript**: Strict mode

## Agent Responsibilities

### Media Types Agent

The Media Types agent owns three source files that define the shared type contract for the entire TypeScript ecosystem:

1. **Auth Types** (`src/auth.ts`) -- `Role`, `User`, `DeviceInfo`, `LoginRequest`, `LoginResponse`, `RegisterRequest`, `AuthStatus`, `ChangePasswordRequest`, `UpdateProfileRequest`

2. **Media Types** (`src/media.ts`) -- `MediaItem`, `MediaEntity` (hierarchy via `parent_id`/`children`), `MediaType`, `MediaFile`, `ExternalMetadata`, `EntityExternalMetadata`, `UserMetadata`, `MediaVersion`, `QualityInfo`, `MediaSearchRequest`, `MediaSearchResponse`, `EntityStats`, `DuplicateGroup`, `PaginatedResponse<T>`

3. **Collection Types** (`src/collections.ts`) -- `MediaCollection`, `SmartCollectionRule`, `CreateCollectionRequest`, `UpdateCollectionRequest`

## Cross-Agent Coordination

### Rule 1: Type Changes Are Breaking

Every other TypeScript/React submodule in the Catalogizer ecosystem depends on this package. Any interface modification requires coordination with all consumers:

- `@vasic-digital/catalogizer-api-client`
- `@vasic-digital/auth-context`
- `@vasic-digital/collection-manager`
- `@vasic-digital/dashboard-analytics`
- `@vasic-digital/media-browser`
- `@vasic-digital/media-player`

### Rule 2: API Contract Alignment

Types must stay synchronized with the Go backend (`catalog-api`). When the API adds or changes a field, the corresponding interface here must be updated to match.

### Rule 3: Interface-Only

No runtime code is permitted. All exports must be TypeScript interfaces or type aliases that are erased at compile time.

## File Map

```
Media-Types-TS/
  src/
    index.ts              -- Re-exports from auth, media, collections
    auth.ts               -- Authentication and user types
    auth.test.ts          -- Auth type structural tests
    media.ts              -- Media entity, file, metadata, search types
    media.test.ts         -- Media type structural tests
    collections.ts        -- Collection and smart rule types
    collections.test.ts   -- Collection type structural tests
```

## Testing Standards

```bash
npm install
npm run build        # tsc
npm run test         # vitest run
npm run lint         # tsc --noEmit
```

Tests verify structural correctness -- that objects conforming to interfaces can be constructed and that required fields are enforced.

## Conventions

- Interface-first design (no classes, no enums)
- PascalCase type names
- JSDoc comments on every exported interface
- `PaginatedResponse<T>` as the generic wrapper for all paginated API responses
- Self-referential hierarchy: `MediaEntity.children` and `MediaEntity.parent_id`

## Constraints

- **No CI/CD pipelines**: GitHub Actions, GitLab CI/CD, and all automated pipeline configurations are permanently disabled. All testing is local.
- **Zero runtime dependencies**: Only `typescript` and `vitest` as dev dependencies.
- **Shared kernel**: This is the single source of truth for TypeScript types across all Catalogizer frontend modules.
