import { createAsyncThunk } from '@reduxjs/toolkit'
import { Actions } from '../enums/actions'
import { AsyncThunkConfig } from '../types/global.types'
import { IUser, LoginData } from '../types/reducers/login'

type ActionReturn = { user: IUser | null }

const login = createAsyncThunk<ActionReturn, LoginData, AsyncThunkConfig>(
  Actions.LOGIN,
  async (data, { extra: { LoginService } }) => {
    const user = await LoginService.login(data)
    return { user }
  }
)

const relogin = createAsyncThunk<ActionReturn, void, AsyncThunkConfig>(
  Actions.RELOGIN,
  async (_, { extra: { LoginService } }) => {
    const user = await LoginService.validateToken()

    return { user }
  }
)

export { login, relogin }
