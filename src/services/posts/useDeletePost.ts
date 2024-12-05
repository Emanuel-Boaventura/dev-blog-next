import { api } from '@/utils/api'
import useSWRMutation from 'swr/mutation'

export function useDeletePost(id: number) {
  const { trigger, isMutating } = useSWRMutation(`/posts/${id}`, url =>
    api.delete(url),
  )

  return { trigger, isMutating }
}
