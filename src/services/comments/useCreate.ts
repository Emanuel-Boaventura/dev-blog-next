import { api } from '@/utils/api'
import useSWRMutation from 'swr/mutation'

interface ICommentForm {
  description: string
}

export function useCreateComment(postId?: number) {
  const { trigger, isMutating } = useSWRMutation(
    postId ? `/comments/${postId}` : null,
    (url, { arg }: { arg: ICommentForm }) => api.post(url, arg),
  )

  return { trigger, isMutating }
}
