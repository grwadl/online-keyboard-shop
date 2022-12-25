import { Loader } from '@/components/base/loading/Loader'
import { ProductSliders } from '@/components/product-page/product-sliders/ProductSliders'
import { UpperInfo } from '@/components/product-page/upper-info/UpperInfo'
import { IProduct } from '@/redux/types/reducers/products'
import { ProductService } from '@/service/api/ProductService'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type Params = {
  id: string
}

const ProductPage = () => {
  const { id } = useParams<Params>()
  const [product, setProduct] = useState<IProduct>()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return
    ProductService.getOne(+id)
      .then((product) => setProduct(product))
      .finally(() => setLoading(false))
  }, [id])

  if (loading)
    return (
      <div className="relative">
        <Loader className="absolute top-20 left-1/2" />
      </div>
    )

  if (!product?.id && !loading) navigate('/')

  return (
    <div className="relative">
      {!!product && <UpperInfo keyboard={product} />}
      <ProductSliders />
    </div>
  )
}

export { ProductPage }
