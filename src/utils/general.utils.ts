export function keys<O extends object>(obj: O): (keyof O)[] {
  return Object.keys(obj) as (keyof O)[]
}

export function arrayIncludesAnyElementFromOtherArray<T>(a: T[], b: T[]) {
  if (b && b.length === 0) {
    return true
  }

  return a.some((el) => b.includes(el))
}
