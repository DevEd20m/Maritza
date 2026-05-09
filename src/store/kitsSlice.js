import { createSlice } from '@reduxjs/toolkit'

const kitsSlice = createSlice({
  name: 'kits',
  initialState: { activeFilter: 'todos' },
  reducers: {
    setFilter(state, { payload }) { state.activeFilter = payload },
  },
})

export const { setFilter } = kitsSlice.actions
export default kitsSlice.reducer
