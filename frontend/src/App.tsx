import { useEffect } from 'react'
import './App.css'
import { Router } from './components/router/router'
import { relogin } from './redux/actions/login-action'
import { useAppDispatch } from './redux/common/hooks'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(relogin())
  }, [])

  return (
    <>
      <Router />
    </>
  )
}

export default App
