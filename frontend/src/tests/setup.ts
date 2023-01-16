import '@testing-library/jest-dom'

const intersectionObserverMock = class {
  observe: () => null
}
window.IntersectionObserver = intersectionObserverMock as unknown as new (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => IntersectionObserver
