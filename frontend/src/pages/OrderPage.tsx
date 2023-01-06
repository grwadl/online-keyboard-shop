import { ConfirmOrder } from '@/components/order-page/ConfirmOrder'
import { OrderForm } from '@/components/order-page/forms/OrderForm'
import { Map } from '@/components/UI/map/Map'

const OrderPage = () => {
  return (
    <div className="order-page flex flex-wrap gap-4">
      <div className="order-page-forms flex-0 basis-full lg:basis-3/5">
        <OrderForm />
        <Map />
      </div>
      <ConfirmOrder className="flex-1 lg:p-5 mt-12" />
    </div>
  )
}

export { OrderPage }
