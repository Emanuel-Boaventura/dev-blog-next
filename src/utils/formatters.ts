export function dateFormatter(date: string, format?: string) {
  const formattedDate = new Intl.DateTimeFormat(format ?? 'pt-BR').format(
    new Date(date),
  )

  return formattedDate
}
