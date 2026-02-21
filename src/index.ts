// Authentication types
export type {
  Role,
  User,
  DeviceInfo,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  AuthStatus,
  ChangePasswordRequest,
  UpdateProfileRequest,
} from './auth'

// Media entity types
export type {
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

// Collection types
export type {
  MediaCollection,
  SmartCollectionRule,
  CreateCollectionRequest,
  UpdateCollectionRequest,
} from './collections'
