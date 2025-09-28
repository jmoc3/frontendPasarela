import { fetchData } from '@/helpers/api'
import { useAppStore } from '@/stores/appStore'
import { UserType } from '@/types/modelTypes'
import { create } from 'zustand'
import { NavigateFunction } from 'react-router-dom'

type State = {
  user: UserType | null
  isAuthenticated: boolean
}

type Actions = {
  checkAuth: () => Promise<void>
  login: (data: UserType, navigate: NavigateFunction) => void
  signUp: (data: UserType, navigate: NavigateFunction) => void
  logout: () => void
}

export const useAuthStore = create<State & Actions>()((set, get) => ({
  user: null,
  isAuthenticated: false,
  checkAuth: async () => {
    const res = await fetchData({ extension: 'me' })

    if (res.code != 200) {
      set({ user: null, isAuthenticated: false })
      return
    }

    set({ user: res.data.user, isAuthenticated: true })
  },
  login: async (data: UserType, navigate: NavigateFunction) => {
    const { setOpenErrorModal, setErrorModalData } = useAppStore.getState()
    const res = await fetchData({
      extension: 'login',
      config: {
        method: 'POST',
        data,
      },
    })
    if (res.code == 406) {
      setErrorModalData({ title: 'Error al ingresar', message: res.message })
      setOpenErrorModal(true)
      console.error('Code Error - 401:', res.message)
      return
    }
    localStorage.setItem('token', res.data.token)
    navigate('/')
  },
  signUp: async (data: UserType, navigate: NavigateFunction) => {
    const { setOpenSucessModal, setSuccessModalData, setOpenErrorModal, setErrorModalData } =
      useAppStore.getState()

    const res = await fetchData({
      extension: 'register',
      config: {
        method: 'POST',
        data,
      },
    })
    if (res.code == 500) {
      setErrorModalData({ title: 'Error al registrar datos', message: res.message })
      setOpenErrorModal(true)
      console.error('Code Error - 500:', res.message)
      return
    }
    setSuccessModalData({
      title: 'Usuario registrado correctamente',
      message: 'Ahora ingresa y disfruta de las opciones que ofrece el sistema',
    })
    setOpenSucessModal(true)
    navigate('/login')
  },
  logout: async () => {
    const { setOpenErrorModal, setErrorModalData } = useAppStore.getState()
    const { checkAuth } = get()
    const res = await fetchData({
      extension: 'logout',
      config: {
        method: 'POST',
      },
    })
    if (res.code == 500) {
      setErrorModalData({ title: 'Error al cerrar sesion', message: res.message })
      setOpenErrorModal(true)
      console.error('Code Error - 500:', res.message)
      return
    }
    set({ user: null, isAuthenticated: false })
    checkAuth()
  },
}))
