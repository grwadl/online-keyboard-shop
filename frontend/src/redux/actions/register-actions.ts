import { createAction, createAsyncThunk, PrepareAction } from '@reduxjs/toolkit'
import { RegisterAction } from '../enums/actions'
import { AsyncThunkConfig } from '../types/global.types'
import { IUser, LoginData } from '../types/reducers/login'

type ActionReturn = { user: IUser | null }

const register = createAsyncThunk<ActionReturn, LoginData, AsyncThunkConfig>(
  RegisterAction.REGISTER,
  async (data, { extra: { LoginService } }) => {
    const user = await LoginService.register(data)
    return { user }
  }
)

const removeError = createAction<PrepareAction<null>>(RegisterAction.REMOVE_ERROR, () => ({ payload: null }))

export { register, removeError }
