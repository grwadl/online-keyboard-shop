import { extraArgument, store } from '../store'

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

type AsyncThunkConfig = {
  state: RootState
  dispatch: AppDispatch
  extra: typeof extraArgument
}

export type { RootState, AppDispatch, AsyncThunkConfig }
