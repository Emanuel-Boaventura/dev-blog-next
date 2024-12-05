import useSWR from 'swr'
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
export function useGetAllPostComments(postId: number) {
  const { data, error, isLoading, mutate } = useSWR<IComment[]>(
    `/comments/post/${postId}`,
  )

  return { data, error, isLoading, mutate }
}
