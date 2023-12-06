export function calculateDeliveryFee(price: number): number {
  if (price === 0) return 0
  if (price <= 100) return 14
  if (price <= 200) return 10
  if (price <= 300) return 5

  return 0
}
