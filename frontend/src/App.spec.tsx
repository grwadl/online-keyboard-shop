import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { describe, expect, it } from 'vitest'
import App from './App'
import { store } from './redux/store'

describe('checking App.tsx component', () => {
  it('should render the App.tsx component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    expect(screen.getByText('KEYBOARD SHOP')).toBeInTheDocument()
  })
})
