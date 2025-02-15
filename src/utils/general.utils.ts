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
