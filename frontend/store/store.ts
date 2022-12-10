import { configureStore, Store } from '@reduxjs/toolkit'
import { loginReducer } from './reducers/login-reducer'

const extraArgument = {}

const store = configureStore({
  reducer: {
    loging: loginReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({})
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
// type AsyncThunkConfig = {
//   state: RootState;
//   dispatch: AppDispatch;
//   extra: typeof extraArgument;
// };

export { store }
export type { RootState, AppDispatch }
