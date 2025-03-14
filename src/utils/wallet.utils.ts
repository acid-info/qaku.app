export const truncateAddress = (
  address: string,
  startChars = 6,
  endChars = 4,
): string => {
  if (!address) return ''
  if (address.length <= startChars + endChars) return address

  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`
}
