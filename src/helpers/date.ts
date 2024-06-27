export function isoStringToLocalFormat(dateString: string): string {
  return new Date(Date.parse(dateString)).toLocaleString()
}
