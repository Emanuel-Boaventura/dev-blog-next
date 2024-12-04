import useSWR from 'swr'

export interface ICompany {
  id: number
  code: string
  number: number
  name: string
  segment: string
  isActive: boolean
  updatedById: null | number
  createdById: null | number
  createdAt: string
  updatedAt: string
  deletedAt: null | string
  stockNumber: number
  costCenter: null | number
}

export function useGetCompanies() {
  const { data, error, isLoading, mutate } = useSWR<ICompany[]>(`/companies`)

  return { data: data ?? [], error, isLoading, mutate }
}
