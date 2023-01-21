import { ReduxError } from '@/utils/ReduxError'
import { Action, AnyAction, AsyncThunkAction, Middleware, isRejectedWithValue } from '@reduxjs/toolkit'
import { logOut } from '../actions/internal'
import { AsyncThunkConfig, RootState } from '../types/internal'

type Class<T> = new (...arg: any[]) => T

const isDirectlyInherit = <T>(instance: unknown, parentClass: Class<T>): instance is T =>
  Object.getPrototypeOf(instance) === parentClass.prototype

export const unauthMiddleware: Middleware<Record<string, unknown>, RootState> =
  (store) => (next) => (action: AsyncThunkAction<any, any, AsyncThunkConfig> | Action) => {
    try {
      next(action as AnyAction)
      if (isRejectedWithValue(action)) throw action.payload
    } catch (e) {
      if (!isDirectlyInherit(e, ReduxError)) return e
      store.dispatch(logOut() as unknown as AnyAction)
    }
  }
