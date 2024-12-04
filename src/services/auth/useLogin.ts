import { api } from '@/utils/api'
import useSWRMutation from 'swr/mutation'

interface ILoginForm {
  name: string
  email: string
}

interface ILoginFormReturn {
  id: number
  name: string
  email: string
}

export function useLogin() {
  const { trigger, isMutating } = useSWRMutation(
    `/auth/signin`,
    (url, { arg }: { arg: ILoginForm }) => api.post<ILoginFormReturn>(url, arg),
  )

  return { trigger, isMutating }
}