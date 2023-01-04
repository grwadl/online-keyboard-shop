import { IDefaultOption } from '@/components/sort/types'
import Button from '@/components/UI/Button'
import { Select } from '@/components/UI/Select'
import { IUser } from '@/redux/types/reducers/login'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './total-payment.scss'

type Props = {
  user: IUser
  className?: string
}

const options: IDefaultOption[] = [{ name: 'After payment', value: 'after' }]

const TotalPayment = ({ user, className }: Props) => {
  const [selectedOption, setSelectedOption] = useState<IDefaultOption>(options[0])
  const changeOption = () => setSelectedOption((v) => v)

  return (
    <div className={`total-payment-wrap p-5 ${className ?? ''}`}>
      <h4 className="total-payment-title text-xl mb-5 font-semibold">Order and delivery</h4>
      <Select
        className="relative mb-5 text-base w-full"
        onChange={changeOption}
        options={options}
        value={selectedOption.value}
      />
      <Select
        className="relative mb-5 text-base w-full"
        onChange={changeOption}
        options={options}
        value={selectedOption.value}
      />
      <h4 className="total-payment-title mb-5 text-xl font-semibold">About the order</h4>
      <div className="total-payment-numbers flex justify-between">
        <span className="total-products-count text-icon-color">Produts ({user.cart.length})</span>
        <span className="total-products-price text-black">$</span>
      </div>
      <div className="total-delivery-numbers flex justify-between">
        <span className="total-delivery-text text-icon-color">Delivery price</span>
        <span className="total-delivery-price">delivery</span>
      </div>
      <div className="final-price flex mt-5 justify-between">
        <div className="final-price-text text-icon-color">Total:</div>
        <div className="final-price-number">price+delivery</div>
      </div>
      <div className="final-buttons mt-10 flex justify-between items-center">
        <Button className="p-2">Continue</Button>
        <Link to="/">Go back to shopping</Link>
      </div>
    </div>
  )
}

export { TotalPayment }
