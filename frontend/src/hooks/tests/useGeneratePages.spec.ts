import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useGeneratePages } from '../useGeneratePages'

describe('testing useGeneratePages.ts', () => {
  it('should return nothing if only 2 pages is available', () => {
    const {
      result: { current }
    } = renderHook(() => useGeneratePages(10, 5))

    expect(current).toStrictEqual([[], true])
  })

  it('should return correct value of the pages', () => {
    const {
      result: { current }
    } = renderHook(() => useGeneratePages(11, 5))

    expect(current).toStrictEqual([[2], false])
  })

  it('should return correct value of the pages if only 1 page is available', () => {
    const {
      result: { current }
    } = renderHook(() => useGeneratePages(5, 5))

    expect(current).toStrictEqual([[], false])
  })
})
