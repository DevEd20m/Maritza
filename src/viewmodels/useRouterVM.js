import { useDispatch, useSelector } from 'react-redux'
import { setRoute, setTransition, clearTransition } from '../store/routerSlice'

export function useRouterVM() {
  const dispatch = useDispatch()
  const route = useSelector(s => s.router.route)
  const transition = useSelector(s => s.router.transition)

  const openKit = (kitId) => {
    dispatch(setTransition('open-kit'))
    setTimeout(() => {
      dispatch(setRoute({ name: 'detail', kitId }))
      dispatch(clearTransition())
    }, 380)
  }

  const backToHome = () => {
    dispatch(setTransition('close-kit'))
    setTimeout(() => {
      dispatch(setRoute({ name: 'home', kitId: null }))
      dispatch(clearTransition())
    }, 280)
  }

  const startQuiz = () => {
    dispatch(setTransition('wipe-up'))
    setTimeout(() => {
      dispatch(setRoute({ name: 'quiz', kitId: null }))
      dispatch(setTransition('wipe-clear'))
      setTimeout(() => dispatch(clearTransition()), 460)
    }, 480)
  }

  const endQuiz = () => backToHome()

  return { route, transition, openKit, backToHome, startQuiz, endQuiz }
}
