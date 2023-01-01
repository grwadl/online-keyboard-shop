const getFromStorage = <T>(key: string): T | null => {
  const data = localStorage.getItem(key)
  if (!data) return null
  return JSON.parse(data) as T
}

const writeToStorage = <T>(key: string, data: T): void => localStorage.setItem(key, JSON.stringify(data))

export { getFromStorage, writeToStorage }
