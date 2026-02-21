/** MediaItem represents a detected and cataloged media item. */
export interface MediaItem {
  id: number
  title: string
  media_type: string
  year?: number
  description?: string
  cover_image?: string
  rating?: number
  quality?: string
  file_size?: number
  duration?: number
  directory_path: string
  storage_root_name?: string
  storage_root_protocol?: string
  created_at: string
  updated_at: string
  external_metadata?: ExternalMetadata[]
  versions?: MediaVersion[]
}

/** ExternalMetadata holds provider-sourced metadata for a media item. */
export interface ExternalMetadata {
  id: number
  media_id: number
  provider: string
  external_id: string
  title: string
  description?: string
  year?: number
  rating?: number
  poster_url?: string
  backdrop_url?: string
  genres?: string[]
  cast?: string[]
  crew?: string[]
  metadata: Record<string, unknown>
  last_updated: string
}

/** MediaVersion represents one quality/format version of a media item. */
export interface MediaVersion {
  id: number
  media_id: number
  version: string
  quality: string
  file_path: string
  file_size: number
  codec?: string
  resolution?: string
  bitrate?: number
  language?: string
}

/** QualityInfo describes the detected quality attributes of a media file. */
export interface QualityInfo {
  overall_score: number
  video_quality?: number
  audio_quality?: number
  resolution: string
  bitrate?: number
  codec: string
  file_size: number
}

/** MediaSearchRequest is the query payload for media search endpoints. */
export interface MediaSearchRequest {
  query?: string
  media_type?: string
  year_min?: number
  year_max?: number
  rating_min?: number
  quality?: string
  sort_by?: string
  sort_order?: 'asc' | 'desc'
  limit?: number
  offset?: number
}

/** MediaSearchResponse wraps paginated media search results. */
export interface MediaSearchResponse {
  items: MediaItem[]
  total: number
  limit: number
  offset: number
}

/** MediaEntity represents the richer entity model from /api/v1/entities. */
export interface MediaEntity {
  id: number
  title: string
  original_title?: string
  year?: number
  description?: string
  genre?: string[]
  director?: string
  rating?: number
  runtime?: number
  language?: string
  country?: string
  status: string
  parent_id?: number
  season_number?: number
  episode_number?: number
  track_number?: number
  first_detected: string
  last_updated: string
  media_type?: MediaType
  files?: MediaFile[]
  children?: MediaEntity[]
  external_metadata?: EntityExternalMetadata[]
  user_metadata?: UserMetadata
}

/** MediaType is an enumeration entry from the media_types table. */
export interface MediaType {
  id: number
  name: string
  description: string
  detection_patterns?: string[]
  metadata_providers?: string[]
}

/** MediaFile links a physical file to a MediaEntity. */
export interface MediaFile {
  id: number
  media_item_id: number
  file_id: number
  file_path: string
  file_size: number
  file_hash?: string
  is_primary: boolean
  added_at: string
}

/** EntityExternalMetadata is provider metadata for a MediaEntity. */
export interface EntityExternalMetadata {
  id: number
  media_item_id: number
  provider: string
  external_id: string
  data: string
  rating?: number
  review_url?: string
  cover_url?: string
  trailer_url?: string
  last_fetched: string
}

/** UserMetadata stores user-specific ratings, favorites, and watch state. */
export interface UserMetadata {
  id: number
  media_item_id: number
  user_id: number
  is_favorite: boolean
  is_watched: boolean
  user_rating?: number
  notes?: string
  updated_at: string
}

/** EntityStats holds aggregate counts for the entity system dashboard. */
export interface EntityStats {
  total_entities: number
  entities_by_type: Record<string, number>
  total_files: number
  total_size: number
  recent_additions: number
  duplicate_groups: number
}

/** DuplicateGroup groups entities that share title, type, and year. */
export interface DuplicateGroup {
  title: string
  media_type_id: number
  year?: number
  count: number
  items: MediaEntity[]
}

/** PaginatedResponse wraps any paginated list response. */
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  limit: number
  offset: number
}
