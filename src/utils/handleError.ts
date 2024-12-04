import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { isAxiosError } from 'axios'

const defaultError = 'Houve algum erro no procedimento.'

function isString(item: any) {
  return typeof item === 'string'
}

function showErrorNotification(message: string) {
  showNotification({
    title: 'Houve um erro',
    message: message,
    color: 'red',
    autoClose: 6000,
  })
}

export function handleError(error: any, defaultErrorMessage?: string) {
  let errorMessage = defaultErrorMessage || defaultError

  const errorData = error?.response?.data

  if (isString(error)) {
    return showErrorNotification(error)
  }

  if (isAxiosError(error)) {
    if (isString(errorData?.message)) {
      return showErrorNotification(errorData.message)
    }
    if (isString(errorData?.error)) {
      return showErrorNotification(errorData.error)
    }
  }

  return showErrorNotification(errorMessage)
}
