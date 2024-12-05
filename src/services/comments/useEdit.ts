import { api } from '@/utils/api'
import useSWRMutation from 'swr/mutation'

interface ICommentForm {
  description: string
}

export function useEditComment(commentId?: number | null) {
  const { trigger, isMutating } = useSWRMutation(
    commentId ? `/comments/${commentId}` : null,
    (url, { arg }: { arg: ICommentForm }) => api.patch(url, arg),
  )

  return { trigger, isMutating }
}
