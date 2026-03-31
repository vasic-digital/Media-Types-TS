import { describe, it, expect } from 'vitest'
import type {
  Role,
  User,
  DeviceInfo,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  AuthStatus,
  ChangePasswordRequest,
  UpdateProfileRequest,
  MediaItem,
  ExternalMetadata,
  MediaVersion,
  QualityInfo,
  MediaSearchRequest,
  MediaSearchResponse,
  MediaEntity,
  MediaType,
  MediaFile,
  EntityExternalMetadata,
  UserMetadata,
  EntityStats,
  DuplicateGroup,
  PaginatedResponse,
  MediaCollection,
  SmartCollectionRule,
  CreateCollectionRequest,
  UpdateCollectionRequest,
} from '../index'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeUser(overrides: Partial<User> = {}): User {
  return {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    first_name: 'Test',
    last_name: 'User',
    role_id: 1,
    role: null,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    ...overrides,
  }
}

function makeEntity(overrides: Partial<MediaEntity> = {}): MediaEntity {
  return {
    id: 1,
    title: 'Test Entity',
    status: 'active',
    first_detected: '2024-01-01T00:00:00Z',
    last_updated: '2024-01-01T00:00:00Z',
    ...overrides,
  }
}

// ---------------------------------------------------------------------------
// Auth types
// ---------------------------------------------------------------------------

describe('Auth types re-exported from index', () => {
  it('Role has all required fields', () => {
    const role: Role = {
      id: 1,
      name: 'admin',
      description: 'System administrator',
      permissions: ['read', 'write', 'admin'],
      is_system: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    }
    expect(role.id).toBe(1)
    expect(role.name).toBe('admin')
    expect(role.permissions).toHaveLength(3)
    expect(role.is_system).toBe(true)
  })

  it('User supports role reference and optional fields', () => {
    const role: Role = {
      id: 1,
      name: 'Admin',
      description: 'Admin role',
      permissions: ['all'],
      is_system: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    }
    const user = makeUser({
      role,
      display_name: 'The Admin',
      last_login_at: '2024-06-15T08:00:00Z',
      permissions: ['all'],
    })
    expect(user.role?.name).toBe('Admin')
    expect(user.display_name).toBe('The Admin')
    expect(user.last_login_at).toBeDefined()
    expect(user.permissions).toContain('all')
  })

  it('DeviceInfo allows all optional fields', () => {
    const empty: DeviceInfo = {}
    expect(empty.device_type).toBeUndefined()

    const full: DeviceInfo = {
      device_type: 'tv',
      platform: 'AndroidTV',
      platform_version: '12',
      app_version: '2.0.0',
      device_model: 'Mi Box 4',
      device_name: 'Living Room',
      screen_size: '3840x2160',
      is_emulator: false,
    }
    expect(full.platform).toBe('AndroidTV')
    expect(full.is_emulator).toBe(false)
  })

  it('LoginRequest has required username and password', () => {
    const req: LoginRequest = { username: 'admin', password: 'secret' }
    expect(req.username).toBe('admin')
    expect(req.device_info).toBeUndefined()
    expect(req.remember_me).toBeUndefined()
  })

  it('LoginRequest supports optional device_info and remember_me', () => {
    const req: LoginRequest = {
      username: 'admin',
      password: 'secret',
      device_info: { platform: 'web' },
      remember_me: true,
    }
    expect(req.device_info?.platform).toBe('web')
    expect(req.remember_me).toBe(true)
  })

  it('LoginResponse contains user and tokens', () => {
    const resp: LoginResponse = {
      user: makeUser(),
      session_token: 'sess_abc',
      refresh_token: 'ref_xyz',
      expires_at: '2025-01-01T00:00:00Z',
    }
    expect(resp.session_token).toMatch(/^sess_/)
    expect(resp.refresh_token).toMatch(/^ref_/)
    expect(resp.user.id).toBe(1)
  })

  it('RegisterRequest requires all fields', () => {
    const req: RegisterRequest = {
      username: 'newuser',
      email: 'new@example.com',
      password: 'pass123',
      first_name: 'New',
      last_name: 'User',
    }
    expect(req.username).toBe('newuser')
    expect(req.email).toContain('@')
  })

  it('AuthStatus supports both authenticated and unauthenticated states', () => {
    const notAuth: AuthStatus = { authenticated: false, error: 'Token expired' }
    expect(notAuth.authenticated).toBe(false)
    expect(notAuth.error).toBe('Token expired')
    expect(notAuth.user).toBeUndefined()

    const auth: AuthStatus = {
      authenticated: true,
      user: makeUser(),
      permissions: ['read', 'write'],
    }
    expect(auth.user?.username).toBe('testuser')
    expect(auth.permissions).toHaveLength(2)
  })

  it('ChangePasswordRequest has current and new password', () => {
    const req: ChangePasswordRequest = {
      current_password: 'old-pass',
      new_password: 'new-pass',
    }
    expect(req.current_password).not.toBe(req.new_password)
  })

  it('UpdateProfileRequest is fully optional', () => {
    const empty: UpdateProfileRequest = {}
    expect(empty.first_name).toBeUndefined()

    const partial: UpdateProfileRequest = { email: 'updated@example.com' }
    expect(partial.email).toBe('updated@example.com')
  })
})

// ---------------------------------------------------------------------------
// Media types
// ---------------------------------------------------------------------------

describe('Media types re-exported from index', () => {
  it('MediaItem has all required fields', () => {
    const item: MediaItem = {
      id: 10,
      title: 'The Matrix',
      media_type: 'movie',
      directory_path: '/media/movies/The Matrix',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    }
    expect(item.title).toBe('The Matrix')
    expect(item.media_type).toBe('movie')
  })

  it('MediaItem supports optional fields', () => {
    const item: MediaItem = {
      id: 10,
      title: 'The Matrix',
      media_type: 'movie',
      year: 1999,
      description: 'A computer hacker learns about the true nature of reality.',
      cover_image: '/covers/matrix.jpg',
      rating: 8.7,
      quality: '1080p',
      file_size: 4_500_000_000,
      duration: 8160,
      directory_path: '/media/movies',
      storage_root_name: 'NAS',
      storage_root_protocol: 'smb',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    }
    expect(item.year).toBe(1999)
    expect(item.rating).toBeCloseTo(8.7)
    expect(item.file_size).toBeGreaterThan(0)
  })

  it('ExternalMetadata holds provider data', () => {
    const meta: ExternalMetadata = {
      id: 1,
      media_id: 10,
      provider: 'tmdb',
      external_id: 'tmdb-603',
      title: 'The Matrix',
      year: 1999,
      rating: 8.7,
      poster_url: 'https://image.tmdb.org/poster.jpg',
      genres: ['Sci-Fi', 'Action'],
      metadata: { tmdb_id: 603 },
      last_updated: '2024-01-01T00:00:00Z',
    }
    expect(meta.provider).toBe('tmdb')
    expect(meta.genres).toContain('Sci-Fi')
  })

  it('MediaVersion describes a specific file version', () => {
    const version: MediaVersion = {
      id: 1,
      media_id: 10,
      version: '4K HDR',
      quality: '2160p',
      file_path: '/media/movies/matrix_4k.mkv',
      file_size: 45_000_000_000,
      codec: 'hevc',
      resolution: '3840x2160',
      bitrate: 40000,
      language: 'en',
    }
    expect(version.codec).toBe('hevc')
    expect(version.resolution).toBe('3840x2160')
  })

  it('QualityInfo describes detected quality', () => {
    const qi: QualityInfo = {
      overall_score: 85,
      video_quality: 90,
      audio_quality: 80,
      resolution: '1920x1080',
      bitrate: 15000,
      codec: 'h264',
      file_size: 2_000_000_000,
    }
    expect(qi.overall_score).toBe(85)
    expect(qi.resolution).toBe('1920x1080')
  })

  it('MediaSearchRequest supports filtering and pagination', () => {
    const req: MediaSearchRequest = {
      query: 'matrix',
      media_type: 'movie',
      year_min: 1990,
      year_max: 2000,
      rating_min: 7.0,
      quality: '1080p',
      sort_by: 'rating',
      sort_order: 'desc',
      limit: 20,
      offset: 0,
    }
    expect(req.query).toBe('matrix')
    expect(req.sort_order).toBe('desc')
  })

  it('MediaSearchResponse wraps paginated results', () => {
    const resp: MediaSearchResponse = {
      items: [],
      total: 0,
      limit: 20,
      offset: 0,
    }
    expect(resp.items).toHaveLength(0)
    expect(resp.total).toBe(0)
  })

  it('MediaEntity supports hierarchy via parent_id and children', () => {
    const show = makeEntity({
      title: 'Breaking Bad',
      media_type: { id: 2, name: 'tv_show', description: 'Television show' },
    })
    const season = makeEntity({
      id: 2,
      title: 'Season 1',
      parent_id: show.id,
      season_number: 1,
      media_type: { id: 3, name: 'tv_season', description: 'Season' },
    })
    const episode = makeEntity({
      id: 3,
      title: 'Pilot',
      parent_id: season.id,
      season_number: 1,
      episode_number: 1,
      media_type: { id: 4, name: 'tv_episode', description: 'Episode' },
    })

    expect(show.parent_id).toBeUndefined()
    expect(season.parent_id).toBe(show.id)
    expect(episode.episode_number).toBe(1)
  })

  it('MediaEntity supports music hierarchy via track_number', () => {
    const artist = makeEntity({ title: 'Pink Floyd' })
    const album = makeEntity({ id: 2, title: 'The Wall', parent_id: artist.id })
    const song = makeEntity({
      id: 3,
      title: 'Comfortably Numb',
      parent_id: album.id,
      track_number: 6,
    })
    expect(song.track_number).toBe(6)
    expect(song.parent_id).toBe(album.id)
  })

  it('MediaType describes a type entry', () => {
    const mt: MediaType = {
      id: 1,
      name: 'movie',
      description: 'Feature film',
      detection_patterns: ['^.*\\.(mp4|mkv|avi)$'],
      metadata_providers: ['tmdb', 'omdb'],
    }
    expect(mt.name).toBe('movie')
    expect(mt.metadata_providers).toContain('tmdb')
  })

  it('MediaFile links a file to an entity', () => {
    const mf: MediaFile = {
      id: 1,
      media_item_id: 10,
      file_id: 100,
      file_path: '/media/movies/matrix.mkv',
      file_size: 4_500_000_000,
      file_hash: 'sha256:abc123',
      is_primary: true,
      added_at: '2024-01-01T00:00:00Z',
    }
    expect(mf.is_primary).toBe(true)
    expect(mf.file_hash).toMatch(/^sha256:/)
  })

  it('EntityExternalMetadata holds provider data for entities', () => {
    const meta: EntityExternalMetadata = {
      id: 1,
      media_item_id: 10,
      provider: 'musicbrainz',
      external_id: 'mb-123',
      data: '{"artist":"Pink Floyd"}',
      rating: 9.0,
      last_fetched: '2024-01-01T00:00:00Z',
    }
    expect(meta.provider).toBe('musicbrainz')
    expect(JSON.parse(meta.data).artist).toBe('Pink Floyd')
  })

  it('UserMetadata tracks user-specific state', () => {
    const um: UserMetadata = {
      id: 1,
      media_item_id: 10,
      user_id: 42,
      is_favorite: true,
      is_watched: true,
      user_rating: 9,
      notes: 'One of my favorites',
      updated_at: '2024-06-01T00:00:00Z',
    }
    expect(um.is_favorite).toBe(true)
    expect(um.user_rating).toBe(9)
  })

  it('EntityStats holds aggregate counts', () => {
    const stats: EntityStats = {
      total_entities: 1000,
      entities_by_type: { movie: 500, tv_show: 200, song: 300 },
      total_files: 5000,
      total_size: 10_000_000_000_000,
      recent_additions: 25,
      duplicate_groups: 10,
    }
    expect(stats.total_entities).toBe(1000)
    expect(stats.entities_by_type['movie']).toBe(500)
    expect(Object.keys(stats.entities_by_type)).toHaveLength(3)
  })

  it('DuplicateGroup groups entities by title+type+year', () => {
    const group: DuplicateGroup = {
      title: 'Inception',
      media_type_id: 1,
      year: 2010,
      count: 3,
      items: [
        makeEntity({ id: 1, title: 'Inception', year: 2010 }),
        makeEntity({ id: 2, title: 'Inception', year: 2010 }),
        makeEntity({ id: 3, title: 'Inception', year: 2010 }),
      ],
    }
    expect(group.count).toBe(3)
    expect(group.items).toHaveLength(3)
  })

  it('PaginatedResponse wraps any typed list', () => {
    const resp: PaginatedResponse<MediaEntity> = {
      items: [makeEntity()],
      total: 100,
      limit: 20,
      offset: 0,
    }
    expect(resp.items).toHaveLength(1)
    expect(resp.total).toBe(100)
    expect(resp.limit).toBe(20)
    expect(resp.offset).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// Collection types
// ---------------------------------------------------------------------------

describe('Collection types re-exported from index', () => {
  it('MediaCollection has all required fields', () => {
    const col: MediaCollection = {
      id: 1,
      name: 'My Favorites',
      user_id: 42,
      is_public: false,
      is_smart: false,
      item_count: 15,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    }
    expect(col.name).toBe('My Favorites')
    expect(col.item_count).toBe(15)
  })

  it('MediaCollection supports optional description and smart_rules', () => {
    const col: MediaCollection = {
      id: 2,
      name: 'Action Movies',
      description: 'All action movies rated above 7',
      user_id: 42,
      is_public: true,
      is_smart: true,
      smart_rules: [
        { field: 'media_type', operator: 'eq', value: 'movie' },
        { field: 'rating', operator: 'gt', value: 7 },
      ],
      item_count: 50,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    }
    expect(col.smart_rules).toHaveLength(2)
    expect(col.is_smart).toBe(true)
    expect(col.is_public).toBe(true)
  })

  it('SmartCollectionRule supports all operators', () => {
    const operators: SmartCollectionRule['operator'][] = ['eq', 'ne', 'gt', 'lt', 'contains', 'not_contains']
    operators.forEach((op) => {
      const rule: SmartCollectionRule = { field: 'title', operator: op, value: 'test' }
      expect(rule.operator).toBe(op)
    })
  })

  it('SmartCollectionRule supports different value types', () => {
    const stringRule: SmartCollectionRule = { field: 'title', operator: 'contains', value: 'Matrix' }
    expect(typeof stringRule.value).toBe('string')

    const numRule: SmartCollectionRule = { field: 'rating', operator: 'gt', value: 7.5 }
    expect(typeof numRule.value).toBe('number')

    const boolRule: SmartCollectionRule = { field: 'is_watched', operator: 'eq', value: true }
    expect(typeof boolRule.value).toBe('boolean')
  })

  it('CreateCollectionRequest requires name', () => {
    const req: CreateCollectionRequest = { name: 'New Collection' }
    expect(req.name).toBe('New Collection')
    expect(req.description).toBeUndefined()
    expect(req.is_public).toBeUndefined()
  })

  it('CreateCollectionRequest supports smart collection setup', () => {
    const req: CreateCollectionRequest = {
      name: 'Smart Collection',
      description: 'Auto-populated',
      is_public: true,
      is_smart: true,
      smart_rules: [{ field: 'genre', operator: 'contains', value: 'Sci-Fi' }],
    }
    expect(req.is_smart).toBe(true)
    expect(req.smart_rules).toHaveLength(1)
  })

  it('UpdateCollectionRequest is fully optional', () => {
    const empty: UpdateCollectionRequest = {}
    expect(empty.name).toBeUndefined()

    const partial: UpdateCollectionRequest = {
      name: 'Renamed',
      is_public: false,
    }
    expect(partial.name).toBe('Renamed')
    expect(partial.is_public).toBe(false)
  })
})
