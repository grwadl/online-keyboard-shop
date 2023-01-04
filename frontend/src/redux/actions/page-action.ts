import { createAction } from '@reduxjs/toolkit'
import { PageActions } from '../enums/actions'

const changeWindowSize = createAction(PageActions.RESIZE, (width: number) => ({ payload: Number(width) >= 768 }))

export { changeWindowSize }
