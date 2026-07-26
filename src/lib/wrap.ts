export function wrap(value: number, half: number) {
  if (half === 0) return 0
  const m = value % half
  return m > 0 ? m - half : m
}
