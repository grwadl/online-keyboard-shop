import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useDebounce } from '../useDebounce'

let useDebounceResult = 0,
  i = 0

beforeEach(() => {
  i = 0
  useDebounceResult = 0
  renderHook(() => useDebounce(() => ++useDebounceResult, [i], 100))
})

describe('testing the useDebounce hook', () => {
  it('should update useDebounceResult only once', () => {
    for (; i < 5; i++);
    setTimeout(() => expect(useDebounceResult).toBe(1), 400)
  })
})
