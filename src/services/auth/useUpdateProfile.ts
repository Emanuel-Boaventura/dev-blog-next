import { api } from '@/utils/api'
import useSWRMutation from 'swr/mutation'
import { IUser } from './useProfile'

interface IUpdateProfileForm {
  name: string
  email: string
}

export function useUpdateProfile(id?: number | null) {
  const { trigger, isMutating } = useSWRMutation(
    id ? `/users/${id}` : null,
    (url, { arg }: { arg: IUpdateProfileForm }) => api.patch<IUser>(url, arg),
  )

  return { trigger, isMutating }
}
