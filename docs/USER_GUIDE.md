# User Guide — @vasic-digital/media-types

## Installation

```bash
npm install @vasic-digital/media-types
```

## Usage

### Import only what you need

```typescript
import type { User, LoginRequest } from '@vasic-digital/media-types'
```

### Type-guard pattern for nullable user

```typescript
import type { User } from '@vasic-digital/media-types'

function greet(user: User | null): string {
  if (!user) return 'Hello, guest'
  return `Hello, ${user.first_name}`
}
```

### Working with paginated responses

```typescript
import type { PaginatedResponse, MediaEntity } from '@vasic-digital/media-types'

function hasMore(page: PaginatedResponse<MediaEntity>): boolean {
  return page.offset + page.items.length < page.total
}
```

### Smart collection rule helper

```typescript
import type { SmartCollectionRule } from '@vasic-digital/media-types'

const rules: SmartCollectionRule[] = [
  { field: 'media_type', operator: 'eq', value: 'movie' },
  { field: 'rating', operator: 'gt', value: 7 },
]
```
