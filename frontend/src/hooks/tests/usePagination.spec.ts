import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { usePagination } from '../usePagination'

describe('testing usePagination.ts', () => {
  it('should correctly return pages to render', () => {
    const {
      result: { current }
    } = renderHook(() => usePagination([2, 3, 4, 5, 6, 7], 1))

    expect(current).toStrictEqual([[2, 3, 4, 5], false, true])
  })

  it('should correctly return pages to render#2', () => {
    const {
      result: { current }
    } = renderHook(() => usePagination([2, 3, 4, 5, 6, 7], 8))

    expect(current).toStrictEqual([[4, 5, 6, 7], true, false])
  })

  it('should correctly return pages to render#3', () => {
    const {
      result: { current }
    } = renderHook(() => usePagination([2, 3, 4, 5, 6, 7], 4))

    expect(current).toStrictEqual([[3, 4, 5], true, true])
  })

  it('should return nothing when page array is empty', () => {
    const {
      result: { current }
    } = renderHook(() => usePagination([], 1))
    expect(current).toStrictEqual([[], false, false])
  })
})
