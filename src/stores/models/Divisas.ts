import { fetchData } from '@/helpers/api'
import { useAppStore } from '@/stores/appStore'
import { DivisaType } from '@/types/modelTypes'
import { create } from 'zustand'

type State = {
  divisas: DivisaType[]
}

type Actions = {
  fetchDivisas: () => void
}

export const useDivisaStore = create<State & Actions>()((set, _) => ({
  divisas: [],
  fetchDivisas: async () => {
    const res = await fetchData({ extension: 'divisas' })
    if (res.code == 500) {
      const { setOpenErrorModal } = useAppStore.getState()
      setOpenErrorModal(true)
      console.error('Error fetching divisas:', res.message)
      return
    }
    set({ divisas: res.data })
  },
}))
