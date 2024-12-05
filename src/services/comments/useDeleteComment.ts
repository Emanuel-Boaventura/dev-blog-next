import { api } from '@/utils/api'
import useSWRMutation from 'swr/mutation'

export function useDeleteComment() {
  const { trigger, isMutating } = useSWRMutation(
    `/comments`,
    (url, { arg: id }: { arg: number }) => api.delete(`${url}/${id}`),
  )

  return { trigger, isMutating }
}
