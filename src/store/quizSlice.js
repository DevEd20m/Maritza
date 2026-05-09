import { createSlice } from '@reduxjs/toolkit'

const quizSlice = createSlice({
  name: 'quiz',
  initialState: { step: 0, answers: {} },
  reducers: {
    nextStep(state) { state.step += 1 },
    prevStep(state) { if (state.step > 0) state.step -= 1 },
    setStep(state, { payload }) { state.step = payload },
    setAnswer(state, { payload: { key, value } }) { state.answers[key] = value },
    toggleAnswer(state, { payload: { key, value } }) {
      const cur = state.answers[key] || []
      state.answers[key] = cur.includes(value)
        ? cur.filter(v => v !== value)
        : [...cur, value]
    },
    resetQuiz(state) { state.step = 0; state.answers = {} },
  },
})

export const { nextStep, prevStep, setStep, setAnswer, toggleAnswer, resetQuiz } = quizSlice.actions
export default quizSlice.reducer
