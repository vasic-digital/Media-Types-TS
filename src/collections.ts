import type { MediaEntity } from './media'

/** MediaCollection represents a named, user-curated set of media entities. */
export interface MediaCollection {
  id: number
  name: string
  description?: string
  user_id: number
  is_public: boolean
  is_smart: boolean
  smart_rules?: SmartCollectionRule[]
  item_count: number
  created_at: string
  updated_at: string
  items?: MediaEntity[]
}

/** SmartCollectionRule defines a filter criterion for a smart collection. */
export interface SmartCollectionRule {
  field: string
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'contains' | 'not_contains'
  value: string | number | boolean
}

/** CreateCollectionRequest is the payload for POST /collections. */
export interface CreateCollectionRequest {
  name: string
  description?: string
  is_public?: boolean
  is_smart?: boolean
  smart_rules?: SmartCollectionRule[]
}

/** UpdateCollectionRequest is the payload for PUT /collections/:id. */
export interface UpdateCollectionRequest {
  name?: string
  description?: string
  is_public?: boolean
  smart_rules?: SmartCollectionRule[]
}
