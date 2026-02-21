/** Role defines a user role with permissions. */
export interface Role {
  id: number
  name: string
  description: string
  permissions: string[]
  is_system: boolean
  created_at: string
  updated_at: string
}

/** User represents an authenticated user. */
export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  role_id: number
  role: Role | null
  display_name?: string
  is_active: boolean
  last_login_at?: string
  created_at: string
  updated_at: string
  permissions?: string[]
}

/** DeviceInfo carries client device metadata sent during login. */
export interface DeviceInfo {
  device_type?: string
  platform?: string
  platform_version?: string
  app_version?: string
  device_model?: string
  device_name?: string
  screen_size?: string
  is_emulator?: boolean
}

/** LoginRequest is the payload for POST /auth/login. */
export interface LoginRequest {
  username: string
  password: string
  device_info?: DeviceInfo
  remember_me?: boolean
}

/** LoginResponse is returned by POST /auth/login. */
export interface LoginResponse {
  user: User
  session_token: string
  refresh_token: string
  expires_at: string
}

/** RegisterRequest is the payload for POST /auth/register. */
export interface RegisterRequest {
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
  device_info?: DeviceInfo
}

/** AuthStatus is returned by GET /auth/status. */
export interface AuthStatus {
  authenticated: boolean
  user?: User
  permissions?: string[]
  error?: string
}

/** ChangePasswordRequest is the payload for POST /auth/change-password. */
export interface ChangePasswordRequest {
  current_password: string
  new_password: string
}

/** UpdateProfileRequest is the payload for PUT /auth/profile. */
export interface UpdateProfileRequest {
  first_name?: string
  last_name?: string
  email?: string
}
