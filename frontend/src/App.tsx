import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
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
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
