export function keys<O extends object>(obj: O): (keyof O)[] {
  return Object.keys(obj) as (keyof O)[]
}

export function arrayIncludesAnyElementFromOtherArray<T>(a: T[], b: T[]) {
  if (b && b.length === 0) {
    return true
  }

  return a.some((el) => b.includes(el))
}

export function getValidPercentage(value: number): number {
  return Math.round(Math.min(100, Math.max(0, value)))
}

export function numberWithCommas(x: number) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function generateRandomPassword(length: number = 16): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let password = ''

  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return password
}
