import { describe, it, expect } from 'vitest'
import type {
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
} from './media'

describe('Media types', () => {
  it('MediaItem has required fields', () => {
    const item: MediaItem = {
      id: 1,
      title: 'Inception',
      media_type: 'movie',
      directory_path: '/media/movies/Inception',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    }
    expect(item.title).toBe('Inception')
    expect(item.media_type).toBe('movie')
  })

  it('MediaItem supports optional fields', () => {
    const item: MediaItem = {
      id: 2,
      title: 'The Dark Knight',
      media_type: 'movie',
      year: 2008,
      rating: 9.0,
      quality: '4K',
      file_size: 50_000_000_000,
      duration: 9180,
      directory_path: '/media/movies/The Dark Knight',
      storage_root_name: 'NAS1',
      storage_root_protocol: 'smb',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    }
    expect(item.year).toBe(2008)
    expect(item.rating).toBe(9.0)
    expect(item.storage_root_protocol).toBe('smb')
  })

  it('ExternalMetadata holds provider data', () => {
    const meta: ExternalMetadata = {
      id: 1,
      media_id: 10,
      provider: 'tmdb',
      external_id: 'tt1375666',
      title: 'Inception',
      metadata: { popularity: 85.5 },
      last_updated: '2024-01-01T00:00:00Z',
    }
    expect(meta.provider).toBe('tmdb')
    expect(meta.metadata.popularity).toBe(85.5)
  })

  it('ExternalMetadata supports arrays for genres and cast', () => {
    const meta: ExternalMetadata = {
      id: 2,
      media_id: 10,
      provider: 'omdb',
      external_id: 'tt0468569',
      title: 'The Dark Knight',
      genres: ['Action', 'Crime', 'Drama'],
      cast: ['Christian Bale', 'Heath Ledger'],
      crew: ['Christopher Nolan'],
      metadata: {},
      last_updated: '2024-01-01T00:00:00Z',
    }
    expect(meta.genres).toHaveLength(3)
    expect(meta.cast).toContain('Heath Ledger')
  })

  it('MediaVersion represents file quality', () => {
    const version: MediaVersion = {
      id: 1,
      media_id: 10,
      version: '4K HDR',
      quality: '4K',
      file_path: '/media/movies/Inception/Inception.4k.mkv',
      file_size: 50_000_000_000,
      codec: 'HEVC',
      resolution: '3840x2160',
      bitrate: 40000,
      language: 'en',
    }
    expect(version.codec).toBe('HEVC')
    expect(version.resolution).toBe('3840x2160')
  })

  it('QualityInfo describes quality attributes', () => {
    const q: QualityInfo = {
      overall_score: 95,
      video_quality: 98,
      audio_quality: 92,
      resolution: '3840x2160',
      bitrate: 40000,
      codec: 'HEVC',
      file_size: 50_000_000_000,
    }
    expect(q.overall_score).toBe(95)
    expect(q.resolution).toBe('3840x2160')
  })

  it('MediaSearchRequest is fully optional', () => {
    const empty: MediaSearchRequest = {}
    expect(empty.query).toBeUndefined()

    const req: MediaSearchRequest = {
      query: 'inception',
      media_type: 'movie',
      year_min: 2000,
      year_max: 2020,
      rating_min: 7.0,
      quality: '1080p',
      sort_by: 'rating',
      sort_order: 'desc',
      limit: 20,
      offset: 0,
    }
    expect(req.query).toBe('inception')
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

  it('MediaEntity has richer fields than MediaItem', () => {
    const entity: MediaEntity = {
      id: 1,
      title: 'Breaking Bad',
      status: 'active',
      first_detected: '2024-01-01T00:00:00Z',
      last_updated: '2024-01-01T00:00:00Z',
    }
    expect(entity.title).toBe('Breaking Bad')
    expect(entity.status).toBe('active')
  })

  it('MediaEntity supports hierarchy fields', () => {
    const episode: MediaEntity = {
      id: 100,
      title: 'Pilot',
      status: 'active',
      parent_id: 10,
      season_number: 1,
      episode_number: 1,
      first_detected: '2024-01-01T00:00:00Z',
      last_updated: '2024-01-01T00:00:00Z',
    }
    expect(episode.parent_id).toBe(10)
    expect(episode.season_number).toBe(1)
    expect(episode.episode_number).toBe(1)
  })

  it('MediaType describes a media type entry', () => {
    const mt: MediaType = {
      id: 1,
      name: 'movie',
      description: 'Feature length film',
      detection_patterns: ['*.mkv', '*.mp4'],
      metadata_providers: ['tmdb', 'omdb'],
    }
    expect(mt.name).toBe('movie')
    expect(mt.detection_patterns).toContain('*.mkv')
  })

  it('MediaFile links a file to an entity', () => {
    const file: MediaFile = {
      id: 1,
      media_item_id: 10,
      file_id: 200,
      file_path: '/media/movies/Inception/Inception.mkv',
      file_size: 15_000_000_000,
      is_primary: true,
      added_at: '2024-01-01T00:00:00Z',
    }
    expect(file.is_primary).toBe(true)
    expect(file.file_size).toBeGreaterThan(0)
  })

  it('EntityExternalMetadata holds provider info', () => {
    const meta: EntityExternalMetadata = {
      id: 1,
      media_item_id: 10,
      provider: 'tmdb',
      external_id: 'tt1375666',
      data: '{"title":"Inception"}',
      last_fetched: '2024-01-01T00:00:00Z',
    }
    expect(meta.provider).toBe('tmdb')
    expect(JSON.parse(meta.data).title).toBe('Inception')
  })

  it('UserMetadata tracks user state', () => {
    const um: UserMetadata = {
      id: 1,
      media_item_id: 10,
      user_id: 1,
      is_favorite: true,
      is_watched: true,
      user_rating: 9,
      notes: 'Great film',
      updated_at: '2024-01-01T00:00:00Z',
    }
    expect(um.is_favorite).toBe(true)
    expect(um.user_rating).toBe(9)
  })

  it('EntityStats holds aggregate counts', () => {
    const stats: EntityStats = {
      total_entities: 1000,
      entities_by_type: { movie: 500, tv_show: 300, song: 200 },
      total_files: 1500,
      total_size: 5_000_000_000_000,
      recent_additions: 25,
      duplicate_groups: 10,
    }
    expect(stats.total_entities).toBe(1000)
    expect(stats.entities_by_type.movie).toBe(500)
    expect(stats.duplicate_groups).toBe(10)
  })

  it('DuplicateGroup groups entities with same title', () => {
    const dg: DuplicateGroup = {
      title: 'Inception',
      media_type_id: 1,
      year: 2010,
      count: 2,
      items: [],
    }
    expect(dg.count).toBe(2)
    expect(dg.year).toBe(2010)
  })

  it('PaginatedResponse is generic', () => {
    const page: PaginatedResponse<MediaEntity> = {
      items: [],
      total: 100,
      limit: 20,
      offset: 40,
    }
    expect(page.total).toBe(100)
    expect(page.offset).toBe(40)
  })
})
