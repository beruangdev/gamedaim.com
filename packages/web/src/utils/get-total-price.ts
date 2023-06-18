export const getTotalPrice = (
  price: number,
  feeplat: number | null,
  feepercent: number | null,
) => {
  const flatprice = feeplat !== null ? feeplat + price : price
  const getpercent = feepercent !== null ? (price * feepercent) / 100 : 0
  const totalFee = feeplat !== null ? feeplat : 0 + Math.round(getpercent)
  const totalPrice = flatprice + Math.round(getpercent)
  return { totalPayment: totalPrice, totalFee: totalFee }
}

export const changePriceToIDR = (price: number) => {
  const priceIdr = price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
  return priceIdr
}

export const addMarginTopUp = (price: number, margin: number) => {
  const getmargin = (price * margin) / 100
  const totalPrice = price + Math.round(getmargin)

  return totalPrice
}

interface PaymentMethods {
  id: string
  minamount: number
  maxamount: number
}
export function filterPaymentsByPrice(
  paymentMethods: PaymentMethods[],
  id: string,
  amount: number,
) {
  const paymentMethod = paymentMethods.find(
    (method: { id: string }) => method.id === id,
  )
  let filterpayment
  if (paymentMethod) {
    filterpayment =
      amount > paymentMethod.minamount && amount < paymentMethod.maxamount
  }

  return filterpayment
}
