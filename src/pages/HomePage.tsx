import { FC, useEffect, useState } from 'react'
import { useAppStore } from '@/stores/appStore'
import { Input } from '@/components/ui/formui/Input'
import { useForm } from 'react-hook-form'
import { TableFacturas } from '@/components/ui/Table'
import { FaPlusSquare } from 'react-icons/fa'
import { FormNewTransaction } from '@/components/homePage/FormNewTransaction'
import { useFacturasStore } from '@/stores/models/Facturas'
import { normalizeText } from '@/helpers/strings'

export const HomePage: FC = () => {
  const { setMode, switchShowModalNew } = useAppStore()
  const newTransaction = () => {
    setMode('creacion')
    switchShowModalNew(true)
  }
  const { facturas, fetchFacturas } = useFacturasStore()

  const [searchValue, setSearchValue] = useState<string>('')

  const headers = [
    'Transactor',
    'Documento',
    'Tipo documento',
    'Numero de tarjeta',
    'Fecha de vencimiento de tarjeta',
    'Codigo de seguridad de tarjeta',
    'Monto',
    'Divisa',
    'Descripcion',
    'Acciones',
  ]

  useEffect(() => {
    fetchFacturas()
  }, [])

  return (
    <div className="flex flex-col bg-transparent">
      <div className="grid gap-4 px-48 py-16">
        <h1 className="text-4xl">Lista de transacciones</h1>
        <div className="grid w-[20rem]">
          <span>Filtrar transacciones</span>
          <div className="flex items-center justify-center gap-2">
            <Input
              name="search"
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              autoComplete="off"
            />
            <FaPlusSquare
              className="cursor-pointer text-2xl text-icons duration-150 hover:text-accent3"
              onClick={newTransaction}
            />
          </div>
        </div>
        <TableFacturas
          headers={headers}
          records={facturas.filter(
            (element) =>
              element.divisa.abreviatura.includes(searchValue) ||
              `${element.monto}`.includes(searchValue) ||
              normalizeText(element.descripcion).includes(normalizeText(searchValue)) ||
              normalizeText(element.transactor).includes(normalizeText(searchValue)) ||
              element.documento.includes(searchValue) ||
              element.tipo_documento.abreviatura.includes(searchValue) ||
              element.numero_tarjeta.includes(searchValue) ||
              normalizeText(element.fecha_vencimiento_tarjeta).includes(
                normalizeText(searchValue)
              ) ||
              element.codigo_seguridad_tarjeta.includes(searchValue) ||
              element.fecha_vencimiento_tarjeta.includes(searchValue)
          )}
        />
      </div>
      <FormNewTransaction />
    </div>
  )
}
