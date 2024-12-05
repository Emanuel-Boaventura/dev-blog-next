import useSWR from 'swr'

export interface IPostReport {
  id: number
  title: string
  description: string
  user_id: number
  image_url: null | string
  created_at: string
  comments_quantity: number
}

export function useGetAllUserPosts(userId?: number | null) {
  const { data, error, isLoading, mutate } = useSWR<IPostReport[]>(
    userId ? `/users/${userId}/posts` : null,
  )

  return { data, error, isLoading, mutate }
}
