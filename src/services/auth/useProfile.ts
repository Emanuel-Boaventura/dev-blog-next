import useSWR from 'swr'

export interface IUser {
  id: number
  name: string
  email: string
  created_at: string
}

export function useProfile() {
  const { data, error, isLoading, mutate } = useSWR<IUser>(`/auth/profile`)

  return { data, error, isLoading, mutate }
}
