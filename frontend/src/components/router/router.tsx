import { Homepage } from '@/pages/Homepage'
import { ProductPage } from '@/pages/ProductPage'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '../base/Layout'

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/:id" element={<ProductPage />} />
        </Route>
      </Routes>
    </>
  )
}

export { Router }
