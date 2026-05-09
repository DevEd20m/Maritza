import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../store/kitsSlice'
import { LIORA_KITS, LIORA_FILTERS } from '../data/data'

export function useKitsVM() {
  const dispatch = useDispatch()
  const activeFilter = useSelector(s => s.kits.activeFilter)

  const filteredKits = activeFilter === 'todos'
    ? LIORA_KITS
    : LIORA_KITS.filter(k => k.category === activeFilter)

  const getKit = (id) => LIORA_KITS.find(k => k.id === id) ?? LIORA_KITS[0]

  return {
    kits: LIORA_KITS,
    filteredKits,
    filters: LIORA_FILTERS,
    activeFilter,
    setFilter: (id) => dispatch(setFilter(id)),
    getKit,
  }
}
