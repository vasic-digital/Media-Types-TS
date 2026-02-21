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
} from './auth'

describe('Auth types', () => {
  it('Role has required fields', () => {
    const role: Role = {
      id: 1,
      name: 'admin',
      description: 'Administrator',
      permissions: ['read', 'write', 'delete'],
      is_system: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    }
    expect(role.name).toBe('admin')
    expect(role.permissions).toContain('read')
    expect(role.is_system).toBe(true)
  })

  it('User has all required fields', () => {
    const user: User = {
      id: 42,
      username: 'johndoe',
      email: 'john@example.com',
      first_name: 'John',
      last_name: 'Doe',
      role_id: 1,
      role: null,
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    }
    expect(user.username).toBe('johndoe')
    expect(user.role).toBeNull()
  })

  it('User supports optional fields', () => {
    const user: User = {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      first_name: 'Admin',
      last_name: 'User',
      role_id: 1,
      role: null,
      display_name: 'Administrator',
      is_active: true,
      last_login_at: '2024-06-01T10:00:00Z',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      permissions: ['admin'],
    }
    expect(user.display_name).toBe('Administrator')
    expect(user.permissions).toContain('admin')
  })

  it('DeviceInfo is fully optional', () => {
    const device: DeviceInfo = {}
    expect(device.device_type).toBeUndefined()

    const fullDevice: DeviceInfo = {
      device_type: 'mobile',
      platform: 'Android',
      platform_version: '14',
      app_version: '1.0.0',
      device_model: 'Pixel 8',
      device_name: 'My Phone',
      screen_size: '1080x2340',
      is_emulator: false,
    }
    expect(fullDevice.platform).toBe('Android')
    expect(fullDevice.is_emulator).toBe(false)
  })

  it('LoginRequest requires username and password', () => {
    const req: LoginRequest = {
      username: 'admin',
      password: 'secret',
    }
    expect(req.username).toBe('admin')
    expect(req.remember_me).toBeUndefined()
  })

  it('LoginResponse has session and refresh tokens', () => {
    const resp: LoginResponse = {
      user: {
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        first_name: 'Admin',
        last_name: 'User',
        role_id: 1,
        role: null,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
      session_token: 'sess_abc123',
      refresh_token: 'ref_xyz789',
      expires_at: '2024-12-31T23:59:59Z',
    }
    expect(resp.session_token).toBe('sess_abc123')
    expect(resp.refresh_token).toBe('ref_xyz789')
  })

  it('RegisterRequest includes all required fields', () => {
    const req: RegisterRequest = {
      username: 'newuser',
      email: 'new@example.com',
      password: 'pass123',
      first_name: 'New',
      last_name: 'User',
    }
    expect(req.email).toBe('new@example.com')
  })

  it('AuthStatus can be authenticated or not', () => {
    const notAuth: AuthStatus = { authenticated: false }
    expect(notAuth.authenticated).toBe(false)
    expect(notAuth.user).toBeUndefined()

    const isAuth: AuthStatus = {
      authenticated: true,
      user: {
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        first_name: 'Admin',
        last_name: 'User',
        role_id: 1,
        role: null,
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
      permissions: ['read', 'write'],
    }
    expect(isAuth.user?.username).toBe('admin')
  })

  it('ChangePasswordRequest has current and new password', () => {
    const req: ChangePasswordRequest = {
      current_password: 'old',
      new_password: 'new',
    }
    expect(req.current_password).toBe('old')
  })

  it('UpdateProfileRequest is fully optional', () => {
    const empty: UpdateProfileRequest = {}
    expect(empty.email).toBeUndefined()

    const partial: UpdateProfileRequest = { first_name: 'Jane' }
    expect(partial.first_name).toBe('Jane')
  })
})
