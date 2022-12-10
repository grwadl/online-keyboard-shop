import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginActions } from '../enums/actions'

interface LoginReturn {
  user: any
}

export const login = createAsyncThunk<LoginReturn, string>(
  LoginActions.LOGIN,
  async (token: string) => {
    try {
      const userData = await fetch('google.com')
      return userData.json()
    } catch (e) {}
  }
)
