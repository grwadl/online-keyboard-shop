import { Slider } from '@/components/UI/slider/Slider'
import Product from '@/components/products/Product'
import { IProduct } from '@/redux/types/reducers/products'

type Props = {
  keyboards: IProduct[]
}

const ProductSliderWrapper = ({ keyboards }: Props) => {
  return (
    <>
      {keyboards && (
        <Slider
          className="py-2"
          renderItem={(it: IProduct) => (
            <Product className="basis-full sm:basis-1/2 md:basis-1/3 xl:basis-1/5 shrink-0" product={it} key={it.id} />
          )}
          slides={keyboards}
        />
      )}
    </>
  )
}

export default ProductSliderWrapper
