import placeholder from '@/assets/shop-placeholder.png'
import Button from '@/components/UI/Button'
import { Hr } from '@/components/UI/Hr'
import { Tag } from '@/components/UI/Tag'
import { LazyLoad } from '@/components/UI/lazy-load/LazyLoad'
import { addProductToCart, removeProductFromCart } from '@/redux/actions/login-action'
import { openModal } from '@/redux/actions/modal-actions'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import { IProduct } from '@/redux/types/reducers/products'
import { useMemo } from 'react'
import { tags } from '../mock'
import { ProductType } from '../product-type/ProductType'
import './taglist.scss'
import './upper-info.scss'

type Props = {
  keyboard: IProduct
}

const UpperInfo = ({ keyboard }: Props) => {
  const { image, name, price, excerpt } = keyboard
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(({ login }) => login)

  const isInCart = useMemo<boolean>(() => {
    if (!user) return false
    return !!user.cart.find((product) => product.product.id === keyboard.id)
  }, [keyboard.id, user])

  const scrollToDescription = () => {
    const element = document.querySelector('.product-description')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const addToCart = () => {
    if (!user) return dispatch(openModal())
    if (isInCart) return dispatch(removeProductFromCart(keyboard.id))
    dispatch(addProductToCart(keyboard.id))
  }

  return (
    <div className="product-wrapper flex flex-wrap gap-2 md:gap-8 mb-5">
      <div className="product-image-wrapper flex justify-center">
        <LazyLoad src={image} className="max-h-[500px] w-full object-cover" alt={name} placeholder={placeholder} />
      </div>
      <div className="product-general-info-wrapper">
        <h2 className="product-name text-3xl text-header-gray mb-5 md:mb-10">{name}</h2>
        <div className="product-buy flex gap-9 items-center">
          <span className="product-price text-header-gray text-2xl">{price} $</span>
          <Button onClick={addToCart} className="py-3 px-7">
            {isInCart ? 'Remove from cart' : 'Add to cart'}
          </Button>
        </div>
        <Hr className="w-full mt-5 md:mt-10" />
        <div className="tags-list flex flex-wrap gap-2 my-5">
          {tags.map((tag) => (
            <Tag {...tag} key={tag.text} />
          ))}
        </div>
        <Hr className="w-full" />
        <div className="product-excerpt text-md my-4 w-[90%]">{excerpt}</div>
        <ProductType keyboard={keyboard} className="mb-2" />
        <span
          onClick={scrollToDescription}
          className="read-more cursor-pointer text-main-accent hover:text-icon-color duration-300"
        >
          Read more
        </span>
      </div>
    </div>
  )
}

export { UpperInfo }
