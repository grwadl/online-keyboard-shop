import { createAsyncThunk } from '@reduxjs/toolkit'
import { Actions } from '../enums/actions'

const login = createAsyncThunk(Actions.LOGIN, async (data) => {
  return
})

export { login }
