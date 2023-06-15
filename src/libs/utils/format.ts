export const formatNumber = (value: number | null) => {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(Number(value))
}
