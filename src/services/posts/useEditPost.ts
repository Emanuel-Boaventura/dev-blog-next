import { api } from '@/utils/api'
import useSWRMutation from 'swr/mutation'

interface IPostForm {
  title: string
  description: string
}

export function useEditPost(id: number) {
  const { trigger, isMutating } = useSWRMutation(
    `/posts/${id}`,
    (url, { arg }: { arg: IPostForm }) => api.patch(url, arg),
  )

  return { trigger, isMutating }
}
