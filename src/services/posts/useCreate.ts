import { api } from '@/utils/api'
import useSWRMutation from 'swr/mutation'

export function useCreatePost() {
  const { trigger, isMutating } = useSWRMutation(
    `/posts`,
    (url, { arg }: { arg: FormData }) => api.post(url, arg),
  )

  return { trigger, isMutating }
}
