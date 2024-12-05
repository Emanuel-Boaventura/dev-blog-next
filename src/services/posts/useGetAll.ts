import useSWR from 'swr'

export interface IPost {
  id: number
  title: string
  description: string
  image_url: string | null
  created_at: string
}

export function useGetAllPosts() {
  const { data, error, isLoading, mutate } = useSWR<IPost[]>(`/posts`)

  return { data, error, isLoading, mutate }
}
