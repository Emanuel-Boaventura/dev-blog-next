import { api } from '@/utils/api'
import { IUser } from '../auth/useProfile'

export interface IComment {
  id: number | null
  description: string | null
  post_id: number | null
  user_id: number | null
  user: IUser | null
  created_at: string
  deleted_by_owner: boolean | null
  deleted_at: null | string
}
export interface IPostFullData {
  id: number
  title: string
  description: string
  image_url: string
  user_id: number
  created_at: string
  user: IUser
  comments: IComment[]
}

export async function getPostById(id: string, token: string) {
  const { data } = await api.get<IPostFullData>(`/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}
