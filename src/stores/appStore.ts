import { create } from 'zustand'

type ModalData = { title: string; message: string }

type LoadingType = { value: boolean; id?: number; type: string }

type State = {
  mode: string
  successModalData: ModalData
  errorModalData: ModalData
  loading: LoadingType
  showModal: boolean
  openErrorModal: boolean
  openSucessModal: boolean
}

type Actions = {
  setMode: (value: string) => void
  setSuccessModalData: (data: ModalData) => void
  setErrorModalData: (data: ModalData) => void
  setLoading: (value: LoadingType) => void
  switchShowModalNew: (value: boolean) => void
  setOpenErrorModal: (value: boolean) => void
  setOpenSucessModal: (value: boolean) => void
}

export const useAppStore = create<State & Actions>()((set, get) => ({
  mode: 'lectura',
  successModalData: {
    title: 'Transaccion guardada exitosamente',
    message:
      'Transacciones actualizadas, puedes alterarlas o filtrarlas segun el campo que quieras',
  },
  errorModalData: {
    title: 'Error en proceso',
    message:
      'Algo ocurrio usando la base de datos, por favor reiniciar la pagina o reintentar mas tarde',
  },
  loading: { value: false, id: 0, type: '' },
  showModal: false,
  openErrorModal: false,
  openSucessModal: false,
  setMode: (value: string) => {
    set({ mode: value })
  },
  setSuccessModalData: (data: ModalData) => {
    set({ successModalData: data })
  },
  setErrorModalData: (data: ModalData) => {
    set({ errorModalData: data })
  },
  setOpenErrorModal: (value: boolean) => {
    set({ openErrorModal: value })
  },
  setOpenSucessModal: (value: boolean) => {
    set({ openSucessModal: value })
  },
  setLoading: (value: LoadingType) => {
    set({ loading: value })
  },
  switchShowModalNew: (value: boolean) => {
    set({ showModal: value })
  },
}))
