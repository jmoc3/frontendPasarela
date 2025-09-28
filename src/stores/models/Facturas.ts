import { fetchData } from '@/helpers/api'
import { useAppStore } from '@/stores/appStore'
import { FacturaType } from '@/types/modelTypes'
import { create } from 'zustand'

type InputModelType = Omit<FacturaType, 'divisa' | 'tipo_documento'>

type State = {
  facturas: FacturaType[]
  inputModel: InputModelType
}

type Actions = {
  setInputModel: (data: InputModelType) => void
  fetchFacturas: () => void
  storeFactura: (factura: Omit<FacturaType, 'id'>) => void
  updateFactura: (id: number, factura: Omit<FacturaType, 'id'>) => void
  deleteFactura: (id: number) => void
  resetInputModel: () => void
}

export const useFacturasStore = create<State & Actions>()((set, get) => ({
  facturas: [],
  inputModel: {
    id: 0,
    divisa_id: 0,
    monto: 0,
    descripcion: '',
    transactor: '',
    documento: '',
    tipo_documento_id: 0,
    numero_tarjeta: '',
    fecha_vencimiento_tarjeta: '',
    codigo_seguridad_tarjeta: '',
  },
  setInputModel: (data: InputModelType) => {
    set({ inputModel: data })
  },
  fetchFacturas: async () => {
    const res = await fetchData({ extension: 'facturas' })
    if (res.code == 500) {
      const { setOpenErrorModal } = useAppStore.getState()
      setOpenErrorModal(true)
      console.error('Error fetching factura:', res.message)
      return
    }
    set({ facturas: res.data })
  },
  storeFactura: async (factura: Omit<FacturaType, 'id'>) => {
    factura.divisa_id = +factura.divisa_id!
    factura.tipo_documento_id = +factura.tipo_documento_id!
    factura.monto = +`${factura.monto}`.replaceAll(',', '.')
    const { setMode, setOpenErrorModal, setOpenSucessModal } = useAppStore.getState()
    const { fetchFacturas } = get()
    try {
      const res = await fetchData({
        extension: 'facturas',
        config: {
          method: 'POST',
          data: factura,
        },
      })
      setMode('lectura')
      if (res.code == 500) {
        setOpenErrorModal(true)
        console.error('Code Error - 500:', res.message)
        return
      }
      fetchFacturas()
      setOpenSucessModal(true)
    } catch (error) {
      console.error('Error storing factura:', error)
      setOpenErrorModal(true)
    }
  },
  updateFactura: async (id: number, factura: Omit<FacturaType, 'id'>) => {
    const { setMode, setOpenErrorModal, setOpenSucessModal } = useAppStore.getState()
    const { fetchFacturas } = get()
    try {
      const res = await fetchData({
        extension: `facturas/${id}`,
        config: {
          method: 'PATCH',
          data: factura,
        },
      })

      setMode('lectura')
      if (res.code == 500) {
        setOpenErrorModal(true)
        console.error('Code Error - 500:', res.message)
        return
      }
      fetchFacturas()
      setOpenSucessModal(true)
    } catch (error) {
      console.error('Error updating factura:', error)
      setOpenErrorModal(true)
    }
  },
  deleteFactura: async (id: number) => {
    const { setOpenErrorModal, setOpenSucessModal } = useAppStore.getState()
    const { fetchFacturas } = get()
    try {
      const res = await fetchData({ extension: `facturas/${id}`, config: { method: 'DELETE' } })

      if (res.code == 500) {
        setOpenErrorModal(true)
        console.error('Code Error - 500ctura:', res.message)
        return
      }
      fetchFacturas()
      setOpenSucessModal(true)
    } catch (error) {
      console.error('Error deleting factura:', error)
      setOpenErrorModal(true)
    }
  },
  resetInputModel: () => {
    set({
      inputModel: {
        id: 0,
        divisa_id: 0,
        monto: 0,
        descripcion: '',
        transactor: '',
        documento: '',
        tipo_documento_id: 0,
        numero_tarjeta: '',
        fecha_vencimiento_tarjeta: '',
        codigo_seguridad_tarjeta: '',
      },
    })
  },
}))
