import { Loader } from '@/components/base/loading/Loader'
import { ProductSliderWrapper } from '@/components/product-page/product-sliders/ProductSliders'
import { UpperInfo } from '@/components/product-page/upper-info/UpperInfo'
import { fetchCurrentProduct, fetchLatestProducts } from '@/redux/actions/product-page-actions'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type Params = {
  id: string
}

const ProductPage = () => {
  const { id } = useParams<Params>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isLoading, latestProducts, product } = useAppSelector(({ productPage }) => productPage)

  useEffect(() => {
    if (!id) return
    Promise.all([dispatch(fetchCurrentProduct(+id)), dispatch(fetchLatestProducts())])
  }, [id])

  if (isLoading)
    return (
      <div className="relative">
        <Loader className="absolute top-20 left-1/2" />
      </div>
    )

  if (!product?.id && !isLoading) navigate('/')

  return (
    <div className="relative">
      {!!product && <UpperInfo keyboard={product} />}
      <ProductSliderWrapper keyboards={latestProducts} />
    </div>
  )
}

export { ProductPage }
