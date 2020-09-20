export function stringToDate(input: string): Date {
  const date = new Date(Date.parse(input))
  return date
}
