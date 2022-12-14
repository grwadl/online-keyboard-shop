import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './components/base/Layout'
import { Homepage } from './pages/Homepage'
import { relogin } from './redux/actions/login-action'
import { useAppDispatch } from './redux/common/hooks'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(relogin())
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
