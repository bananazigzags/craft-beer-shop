export const basketTotal = (basket) => {
  return Object.values(basket.items).reduce((prev, cur) => Math.round((prev + cur.amount * cur.price) * 100 + Number.EPSILON) / 100, 0)
}