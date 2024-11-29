export function calculateDiscountRate(price: number, userPrice: number) {
  if (price <= 0) {
    throw new Error("원래 가격은 0보다 커야 합니다.");
  }

  const discountRate = ((price - userPrice) / price) * 100;
  return discountRate.toFixed(0); // 소수점 둘째 자리까지 반환
}
