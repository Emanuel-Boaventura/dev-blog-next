import { api } from '@/utils/api'
import useSWRMutation from 'swr/mutation'

interface IPostForm {
  title: string
  description: string
}

export function useCreatePost() {
  const { trigger, isMutating } = useSWRMutation(
    `/posts`,
    (url, { arg }: { arg: IPostForm }) => api.post(url, arg),
  )

  return { trigger, isMutating }
}
