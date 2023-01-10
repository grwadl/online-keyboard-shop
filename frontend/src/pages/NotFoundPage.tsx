import Button from '@/components/UI/Button'
import { Link } from 'react-router-dom'

const links = [{ name: 'Home', to: '/' }]

const NotFoundPage = () => {
  return (
    <div className="not-found w-full h-full flex flex-col pt-40 md:pt-20 items-center">
      <h1 className="big-numbers mb-4 text-[130px] md:text-[200px]">404</h1>
      <div className="not-found-desc text-2xl text-center">Unfortunately, page you're looking for is not found..</div>
      <Link to="/">
        <Button className="px-4 mt-8 text-2xl">Home</Button>
      </Link>
    </div>
  )
}

export default NotFoundPage
