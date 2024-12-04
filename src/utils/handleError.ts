import { openConfirmModal } from '@mantine/modals'
import { isAxiosError } from 'axios'

const defaultError = 'Houve algum erro no procedimento.'

function isString(item: any) {
  return typeof item === 'string'
}

function openModal(message: string) {
  openConfirmModal({
    title: 'Houve um erro',
    children: message,
    cancelProps: { display: 'none' },
    onConfirm: () => console.log('Confirmed'),
  })
}

export function handleError(error: any, defaultErrorMessage?: string) {
  let errorMessage = defaultErrorMessage || defaultError

  const errorData = error?.response?.data

  if (isString(error)) {
    return openModal(error)
  }

  if (isAxiosError(error)) {
    if (isString(errorData?.message)) {
      return openModal(errorData.message)
    }
    if (isString(errorData?.error)) {
      return openModal(errorData.error)
    }
  }

  return openModal(errorMessage)
}
