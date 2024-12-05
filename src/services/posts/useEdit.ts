import { api } from '@/utils/api'
import useSWRMutation from 'swr/mutation'

export function useEditPost(id: number) {
  const { trigger, isMutating } = useSWRMutation(
    `/posts/${id}`,
    (url, { arg }: { arg: FormData }) => api.patch(url, arg),
  )

  return { trigger, isMutating }
}
