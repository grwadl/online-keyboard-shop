import { Text } from '../HeaderAndTextBlock'

const shippingKyivText: Text[] = [
  { leftSide: 'from 6000$', rightSide: 'free' },
  { leftSide: 'from 3000$ to 6000$', rightSide: '300$' },
  { leftSide: 'less than 3000$', rightSide: '500$' }
]

const shippingKyivRegionText: Text[] = [
  { leftSide: 'from 3000$ to 6000$', rightSide: '500$' },
  { leftSide: 'less than 3000$', rightSide: '6000$' }
]

const shippingOtherCitiesText: Text[] = [
  { leftSide: 'more than 6000$', rightSide: 'free' },
  { leftSide: 'less than 6000$', rightSide: '1000$' }
]

const paymentKyivAndRegionText: Text[] = [{ leftSide: 'Prepayment or after delivery' }]

const paymentOtherRegionsText: Text[] = [{ leftSide: 'Only prepayment' }]

const guarantyText: Text[] = [{ leftSide: 'Guaranty for 365 days from the day of delivery' }]

const refundText: Text[] = [{ leftSide: 'Refund within 14 days of purchase' }]

export {
  shippingKyivText,
  shippingKyivRegionText,
  shippingOtherCitiesText,
  paymentKyivAndRegionText,
  paymentOtherRegionsText,
  guarantyText,
  refundText
}
