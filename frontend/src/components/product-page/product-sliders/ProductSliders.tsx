import Product from '@/components/products/Product'
import { Slider } from '@/components/UI/slider/Slider'
import { IProduct } from '@/redux/types/reducers/products'

type Props = {
  keyboards: IProduct[]
}

const ProductSliderWrapper = ({ keyboards }: Props) => {
  return (
    <>
      {keyboards && (
        <Slider
          renderItem={(it: IProduct) => <Product className="basis-1/5 shrink-0" product={it} key={it.id} />}
          slides={keyboards}
        />
      )}
    </>
  )
}

export { ProductSliderWrapper }
