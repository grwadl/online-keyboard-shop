import Button from '@/components/UI/Button'
import { Hr } from '@/components/UI/Hr'
import { Tag } from '@/components/UI/Tag'
import { IProduct } from '@/redux/types/reducers/products'
import { tags } from '../mock'
import { ProductType } from '../product-type/ProductType'
import './taglist.scss'

type Props = {
  keyboard: IProduct
}

const UpperInfo = ({ keyboard }: Props) => {
  const { image, name, price, excerpt } = keyboard

  return (
    <div className="product-wrapper flex gap-8 mb-5">
      <div className="product-image-wrapper px-10 flex justify-center flex-grow-0 flex-shrink-0 basis-1/3">
        <img src={image} className="max-h-[500px] object-cover w-auto" alt={name} />
      </div>
      <div className="product-general-info-wrapper">
        <h2 className="product-name text-3xl text-header-gray mb-10">{name}</h2>
        <div className="product-buy flex gap-9 items-center">
          <span className="product-price text-header-gray text-2xl">{price} $</span>
          <Button className="py-3 px-7">Add to cart</Button>
        </div>
        <Hr className="w-full mt-10" />
        <div className="tags-list flex gap-2 my-5">
          {tags.map((tag) => (
            <Tag {...tag} key={tag.text} />
          ))}
        </div>
        <Hr className="w-full" />
        <div className="product-excerpt text-md my-4 w-[90%]">{excerpt}</div>
        <ProductType keyboard={keyboard} className="mb-2" />
      </div>
    </div>
  )
}

export { UpperInfo }
