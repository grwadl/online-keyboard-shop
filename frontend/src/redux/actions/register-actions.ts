import { PrepareAction, createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RegisterAction } from '../enums/actions'
import { AsyncThunkConfig } from '../store'
import { IUser, LoginData } from '../types/reducers/login'

type ActionReturn = { user: IUser | null }

const register = createAsyncThunk<ActionReturn, LoginData, AsyncThunkConfig>(
  RegisterAction.REGISTER,
  async (data, { extra: { LoginService } }) => {
    await LoginService.register(data)
    return { user: null }
  }
)

const removeErrorReg = createAction<PrepareAction<null>>(RegisterAction.REMOVE_ERROR, () => ({ payload: null }))

export { register, removeErrorReg }
