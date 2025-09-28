import { fetchData } from '@/helpers/api'
import { useAppStore } from '@/stores/appStore'
import { TipoDocumentoType } from '@/types/modelTypes'
import { create } from 'zustand'

type State = {
  tiposDocumentos: TipoDocumentoType[]
}

type Actions = {
  fetchTiposDocumentos: () => void
}

export const useTiposDocumentosStore = create<State & Actions>()((set, _) => ({
  tiposDocumentos: [],
  fetchTiposDocumentos: async () => {
    const res = await fetchData({ extension: 'tipos_documentos' })

    if (res.code == 500) {
      const { setOpenErrorModal } = useAppStore.getState()
      setOpenErrorModal(true)
      console.error('Error fetching divisas:', res.message)
      return
    }
    set({ tiposDocumentos: res.data })
  },
}))
