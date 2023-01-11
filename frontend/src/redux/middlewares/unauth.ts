import { ReduxError } from '@/utils/ReduxError'
import { Action, AnyAction, AsyncThunkAction, Middleware, isRejectedWithValue } from '@reduxjs/toolkit'
import { logOut } from '../actions/internal'
import { AsyncThunkConfig, RootState } from '../types/internal'

export const unauthMiddleware: Middleware<Record<string, unknown>, RootState> =
  (store) => (next) => (action: AsyncThunkAction<any, any, AsyncThunkConfig> | Action) => {
    try {
      next(action as AnyAction)
      if (isRejectedWithValue(action)) throw action.payload
    } catch (e) {
      if (!(e instanceof ReduxError)) return e
      store.dispatch(logOut() as unknown as AnyAction)
    }
  }
