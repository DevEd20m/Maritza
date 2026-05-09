import { createSlice } from '@reduxjs/toolkit'

const routerSlice = createSlice({
  name: 'router',
  initialState: {
    route: { name: 'home', kitId: null },
    transition: null,
  },
  reducers: {
    setRoute(state, { payload }) { state.route = payload },
    setTransition(state, { payload }) { state.transition = payload },
    clearTransition(state) { state.transition = null },
  },
})

export const { setRoute, setTransition, clearTransition } = routerSlice.actions
export default routerSlice.reducer
