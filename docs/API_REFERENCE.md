# API Reference — @vasic-digital/media-types

## Auth Types (`src/auth.ts`)

### `Role`
User role with permissions.

| Field | Type | Required |
|-------|------|----------|
| id | number | ✓ |
| name | string | ✓ |
| description | string | ✓ |
| permissions | string[] | ✓ |
| is_system | boolean | ✓ |
| created_at | string (ISO 8601) | ✓ |
| updated_at | string (ISO 8601) | ✓ |

### `User`
Authenticated user profile.

| Field | Type | Required |
|-------|------|----------|
| id | number | ✓ |
| username | string | ✓ |
| email | string | ✓ |
| first_name | string | ✓ |
| last_name | string | ✓ |
| role_id | number | ✓ |
| role | Role \| null | ✓ |
| display_name | string | — |
| is_active | boolean | ✓ |
| last_login_at | string | — |
| created_at | string | ✓ |
| updated_at | string | ✓ |
| permissions | string[] | — |

### `LoginRequest`
POST /auth/login payload.

| Field | Type | Required |
|-------|------|----------|
| username | string | ✓ |
| password | string | ✓ |
| device_info | DeviceInfo | — |
| remember_me | boolean | — |

### `LoginResponse`
Response from POST /auth/login.

| Field | Type | Required |
|-------|------|----------|
| user | User | ✓ |
| session_token | string | ✓ |
| refresh_token | string | ✓ |
| expires_at | string | ✓ |

## Media Types (`src/media.ts`)

### `MediaEntity`
Richer entity model from /api/v1/entities.

| Field | Type | Required |
|-------|------|----------|
| id | number | ✓ |
| title | string | ✓ |
| status | string | ✓ |
| first_detected | string | ✓ |
| last_updated | string | ✓ |
| year | number | — |
| genre | string[] | — |
| rating | number | — |
| runtime | number | — |
| parent_id | number | — |
| season_number | number | — |
| episode_number | number | — |
| media_type | MediaType | — |
| files | MediaFile[] | — |
| children | MediaEntity[] | — |

### `EntityStats`
Aggregate counts for dashboard.

| Field | Type | Description |
|-------|------|-------------|
| total_entities | number | Total entity count |
| entities_by_type | Record<string, number> | Count per type name |
| total_files | number | Total linked files |
| total_size | number | Total bytes |
| recent_additions | number | Added in last 7 days |
| duplicate_groups | number | Groups of duplicates |

### `PaginatedResponse<T>`
Generic paginated list wrapper.

| Field | Type |
|-------|------|
| items | T[] |
| total | number |
| limit | number |
| offset | number |

## Collections Types (`src/collections.ts`)

### `MediaCollection`

| Field | Type | Required |
|-------|------|----------|
| id | number | ✓ |
| name | string | ✓ |
| user_id | number | ✓ |
| is_public | boolean | ✓ |
| is_smart | boolean | ✓ |
| item_count | number | ✓ |
| description | string | — |
| smart_rules | SmartCollectionRule[] | — |
| items | MediaEntity[] | — |

### `SmartCollectionRule`

| Field | Type |
|-------|------|
| field | string |
| operator | 'eq' \| 'ne' \| 'gt' \| 'lt' \| 'contains' \| 'not_contains' |
| value | string \| number \| boolean |
