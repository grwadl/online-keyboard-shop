import { OrderForm } from '@/components/order-page/forms/OrderForm'
import { Map } from '@/components/UI/map/Map'

const OrderPage = () => {
  return (
    <div className="order-page flex flex-wrap">
      <div className="order-page-forms flex-0 basis-full lg:basis-3/5">
        <OrderForm />
        <Map />
      </div>
    </div>
  )
}

export { OrderPage }
