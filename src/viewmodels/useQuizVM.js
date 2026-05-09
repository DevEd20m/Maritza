import { useDispatch, useSelector } from 'react-redux'
import { nextStep, prevStep, setAnswer, toggleAnswer, resetQuiz } from '../store/quizSlice'
import { LIORA_QUIZ } from '../data/data'

export function useQuizVM() {
  const dispatch = useDispatch()
  const { step, answers } = useSelector(s => s.quiz)

  const totalSteps = LIORA_QUIZ.length
  const current = LIORA_QUIZ[Math.min(step, totalSteps - 1)]
  const progress = ((step + 1) / totalSteps) * 100

  const advance = (onComplete) => {
    if (step < totalSteps - 1) {
      dispatch(nextStep())
    } else {
      onComplete?.(answers)
    }
  }

  const back = (onBack) => {
    if (step === 0) { onBack?.(); return }
    dispatch(prevStep())
  }

  const answer = (key, value) => dispatch(setAnswer({ key, value }))
  const toggle = (key, value) => dispatch(toggleAnswer({ key, value }))
  const reset = () => dispatch(resetQuiz())

  return { step, answers, current, progress, totalSteps, advance, back, answer, toggle, reset }
}
