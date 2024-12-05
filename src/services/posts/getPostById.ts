import { api } from '@/utils/api'
import { IUser } from '../auth/useProfile'
export interface IPostFullData {
  id: number
  title: string
  description: string
  image_url: string
  user_id: number
  created_at: string
  user: IUser
}

export async function getPostById(id: string, token: string) {
  const { data } = await api.get<IPostFullData>(`/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}
