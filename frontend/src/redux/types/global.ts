import { extraArgument, store } from '../internal'
import { rootReducer } from '../reducers/root-reducer'

type RootState = ReturnType<typeof rootReducer>

type AppDispatch = typeof store.dispatch

type AsyncThunkConfig = {
  state: RootState
  dispatch: AppDispatch
  extra: typeof extraArgument
}

export type { RootState, AppDispatch, AsyncThunkConfig }
