export interface AuthUser {
  access: string
  refresh: string
  username: string
}

export interface LoginResponse {
  access: string
  refresh: string
  username: string
}

export interface MeResponse {
  username: string
  is_staff: boolean
}
