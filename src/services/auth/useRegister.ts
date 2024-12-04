import { api } from '@/utils/api'
import useSWRMutation from 'swr/mutation'

interface IRegisterForm {
  name: string
  email: string
}

interface IRegisterFormReturn {
  id: number
  name: string
  email: string
}

export function useRegister() {
  const { trigger, isMutating } = useSWRMutation(
    `/auth/signup`,
    (url, { arg }: { arg: IRegisterForm }) =>
      api.post<IRegisterFormReturn>(url, arg),
  )

  return { trigger, isMutating }
}
