export const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(value)
}
