import { api } from '@/utils/api'
import useSWRMutation from 'swr/mutation'

interface IPostFormReturn {}

interface IPostForm {
  title: string
  description: string
}

export function useCreatePost() {
  const { trigger, isMutating } = useSWRMutation(
    `/posts`,
    (url, { arg }: { arg: IPostForm }) => api.post<IPostFormReturn>(url, arg),
  )

  return { trigger, isMutating }
}
