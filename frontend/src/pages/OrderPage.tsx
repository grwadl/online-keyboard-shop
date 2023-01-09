import { Loader } from '@/components/base/loading/Loader'
import { ConfirmOrder } from '@/components/order-page/ConfirmOrder'
import { OrderForm } from '@/components/order-page/forms/OrderForm'
import React, { Suspense } from 'react'

const Map = React.lazy(() => import('@/components/UI/map/Map'))

const OrderPage = () => {
  return (
    <div className="order-page flex flex-wrap gap-4">
      <div className="order-page-forms flex-0 basis-full lg:basis-3/5">
        <OrderForm />
        <Suspense
          fallback={
            <div className="flex w-full justify-center relative">
              <Loader className="pt-20" />
            </div>
          }
        >
          <Map />
        </Suspense>
      </div>
      <ConfirmOrder className="flex-1 lg:p-5 mt-12" />
    </div>
  )
}

export { OrderPage }
