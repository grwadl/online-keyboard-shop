import { useState } from 'react'
import { useParams } from 'react-router-dom'

type Params = {
  id: string
}

const ProductPage = () => {
  const { id } = useParams<Params>()
  const [product, setProduct] = useState()

  return <div>ProductPage {id}</div>
}

export { ProductPage }
