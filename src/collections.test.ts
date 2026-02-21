import { describe, it, expect } from 'vitest'
import type {
  MediaCollection,
  SmartCollectionRule,
  CreateCollectionRequest,
  UpdateCollectionRequest,
} from './collections'

describe('Collections types', () => {
  it('MediaCollection has required fields', () => {
    const col: MediaCollection = {
      id: 1,
      name: 'Favorites',
      user_id: 1,
      is_public: false,
      is_smart: false,
      item_count: 0,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    }
    expect(col.name).toBe('Favorites')
    expect(col.is_smart).toBe(false)
    expect(col.item_count).toBe(0)
  })

  it('MediaCollection supports optional fields', () => {
    const col: MediaCollection = {
      id: 2,
      name: 'Action Movies',
      description: 'All action movies rated 8+',
      user_id: 1,
      is_public: true,
      is_smart: true,
      smart_rules: [
        { field: 'media_type', operator: 'eq', value: 'movie' },
        { field: 'rating', operator: 'gt', value: 8 },
      ],
      item_count: 42,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    }
    expect(col.description).toBe('All action movies rated 8+')
    expect(col.smart_rules).toHaveLength(2)
  })

  it('SmartCollectionRule supports all operators', () => {
    const rules: SmartCollectionRule[] = [
      { field: 'media_type', operator: 'eq', value: 'movie' },
      { field: 'media_type', operator: 'ne', value: 'tv_show' },
      { field: 'rating', operator: 'gt', value: 7 },
      { field: 'rating', operator: 'lt', value: 10 },
      { field: 'genre', operator: 'contains', value: 'Action' },
      { field: 'title', operator: 'not_contains', value: 'Extended' },
    ]
    expect(rules[0].operator).toBe('eq')
    expect(rules[4].operator).toBe('contains')
    expect(rules[5].operator).toBe('not_contains')
  })

  it('SmartCollectionRule value can be string, number, or boolean', () => {
    const strRule: SmartCollectionRule = { field: 'status', operator: 'eq', value: 'active' }
    const numRule: SmartCollectionRule = { field: 'rating', operator: 'gt', value: 7.5 }
    const boolRule: SmartCollectionRule = { field: 'is_watched', operator: 'eq', value: true }
    expect(typeof strRule.value).toBe('string')
    expect(typeof numRule.value).toBe('number')
    expect(typeof boolRule.value).toBe('boolean')
  })

  it('CreateCollectionRequest has required name', () => {
    const req: CreateCollectionRequest = { name: 'New Collection' }
    expect(req.name).toBe('New Collection')
    expect(req.is_public).toBeUndefined()
  })

  it('CreateCollectionRequest supports smart collection fields', () => {
    const req: CreateCollectionRequest = {
      name: 'Smart: 4K Movies',
      description: 'All 4K quality movies',
      is_public: false,
      is_smart: true,
      smart_rules: [
        { field: 'quality', operator: 'eq', value: '4K' },
        { field: 'media_type', operator: 'eq', value: 'movie' },
      ],
    }
    expect(req.is_smart).toBe(true)
    expect(req.smart_rules).toHaveLength(2)
  })

  it('UpdateCollectionRequest is fully optional', () => {
    const empty: UpdateCollectionRequest = {}
    expect(empty.name).toBeUndefined()
    expect(empty.is_public).toBeUndefined()

    const partial: UpdateCollectionRequest = {
      name: 'Updated Name',
      is_public: true,
    }
    expect(partial.name).toBe('Updated Name')
  })

  it('UpdateCollectionRequest supports updating smart rules', () => {
    const req: UpdateCollectionRequest = {
      smart_rules: [
        { field: 'rating', operator: 'gt', value: 9 },
      ],
    }
    expect(req.smart_rules).toHaveLength(1)
    expect(req.smart_rules?.[0].field).toBe('rating')
  })
})
