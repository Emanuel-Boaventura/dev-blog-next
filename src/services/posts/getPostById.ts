import { api } from '@/utils/api'

interface IComment {
  id: number
  description: string
  post_id: number
  user_id: number
}

export interface IPostFullData {
  id: number
  title: string
  description: string
  user_id: number
  comments: IComment[]
}

export async function getPostById(id: string, token: string) {
  const { data } = await api.get<IPostFullData>(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
