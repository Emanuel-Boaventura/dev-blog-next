import useSWR from 'swr'

interface IProfile {
  id: number
  name: string
  email: string
}

export function useProfile() {
  const { data, error, isLoading, mutate } = useSWR<IProfile>(`/auth/profile`)

  return { data: data, error, isLoading, mutate }
}
