import { InitialValue } from '@/pages/OrderPage'
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { NovaPoshtaActions } from '../enums/actions'
import { AsyncThunkConfig } from '../types/global.types'
import { City, NovaPoshtaResponse, PostOffice } from '../types/reducers/nova-poshta-reducer'

type HintReturn = {
  fieldName: 'city' | 'post'
} & { data: PostOffice[] | City[] }

const changeActiveField = createAction(NovaPoshtaActions.CHANGE_ACTIVE, (payload: 'city' | 'post') => ({ payload }))

const clearActiveField = createAction(NovaPoshtaActions.CLEAR_ACTIVE, () => ({ payload: null }))

const changeNovaPoshtaHint = createAsyncThunk<HintReturn, InitialValue, AsyncThunkConfig>(
  NovaPoshtaActions.CHANGE_HINT,
  async (values, { getState, extra: { PostService }, rejectWithValue }) => {
    const {
      post: { activeField }
    } = getState()

    if (!activeField || !(activeField === 'city' || activeField === 'post')) return rejectWithValue([])
    const searchedValue = values[activeField]

    let hintResult: NovaPoshtaResponse

    if (!searchedValue) return rejectWithValue([])

    if (activeField === 'post') hintResult = await PostService.getPostOfiice(searchedValue)
    else hintResult = await PostService.getCity(searchedValue)
    if (!hintResult.success) return rejectWithValue([])
    return { fieldName: activeField, data: hintResult.data }
  }
)

export { changeActiveField, clearActiveField, changeNovaPoshtaHint }
