import { configureStore } from '@reduxjs/toolkit'
import routerReducer from './routerSlice'
import kitsReducer from './kitsSlice'
import quizReducer from './quizSlice'

export const store = configureStore({
  reducer: {
    router: routerReducer,
    kits: kitsReducer,
    quiz: quizReducer,
  },
})
