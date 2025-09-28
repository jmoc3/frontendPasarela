import { Loading } from '@/components/ui/Loading'
import { useFacturasStore } from '@/stores/models/Facturas'
import { useAppStore } from '@/stores/appStore'
import { FacturaType } from '@/types/modelTypes'
import { FC } from 'react'
import { FaPen, FaRegTrashAlt } from 'react-icons/fa'

type TableFacturasProps = {
  headers: string[]
  records: FacturaType[]
}

export const TableFacturas: FC<TableFacturasProps> = ({ headers, records }) => {
  const { loading, setMode, setLoading, switchShowModalNew } = useAppStore()
  const { setInputModel, deleteFactura } = useFacturasStore()

  const onEdit = (element: FacturaType) => {
    if (loading.value == true) {
      return
    }
    setMode('edit')
    setInputModel(element)
    switchShowModalNew(true)
  }

  const onDelete = async (id: number) => {
    if (loading.value == true) {
      return
    }
    setLoading({ value: true, id, type: 'delete' })
    await deleteFactura(id)
    setLoading({ value: false, id, type: 'delete' })
  }

  return (
    <div className="relative h-[50vh] overflow-x-auto shadow-md sm:rounded-lg dark:bg-gray-700">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-center">
            {headers.map((element, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 ${element == 'Fecha de vencimiento de tarjeta' && 'w-[10rem]'} ${element == 'Codigo de seguridad de tarjeta' && 'w-[10rem]'} ${element == 'Monto' && 'w-[10rem]'} ${element == 'Descripcion' && 'w-[15rem]'}`}
              >
                {element}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((element) => (
              <tr
                key={element.id}
                className="border-b border-gray-200 text-center odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
              >
                <td className="px-5 py-4">{element.transactor}</td>
                <td className="px-5 py-4">{element.documento}</td>
                <td className="cursor-pointer px-5 py-4">{element.tipo_documento.abreviatura}</td>
                <td className="px-5 py-4">{element.numero_tarjeta}</td>
                <td className="px-5 py-4">{element.fecha_vencimiento_tarjeta}</td>
                <td className="px-5 py-4">{element.codigo_seguridad_tarjeta}</td>
                <td className="px-5 py-4">{element.monto}</td>
                <td className="cursor-pointer px-5 py-4">{element.divisa.abreviatura}</td>
                <td className="px-5 py-4 text-xs">{element.descripcion}</td>
                {records.length > 0 && (
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <FaPen
                        className="cursor-pointer text-icons duration-300 hover:text-accent3"
                        onClick={() => onEdit(element)}
                      />
                      {loading.value && loading.id == element.id && loading.type == 'delete' ? (
                        <Loading
                          svgClasses="!w-[1rem] !h-[1rem] group-hover:text-white group-hover:fill-accent3 duration-300 "
                          color="white"
                          bgColor="accent3"
                        />
                      ) : (
                        <FaRegTrashAlt
                          className="cursor-pointer text-icons duration-300 hover:text-accent2"
                          onClick={() => onDelete(element.id)}
                        />
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="px-6 py-8 text-center">
                Ninguna transaccion encontrada hasta el momento. Limpia el buscador o dale al boton
                de + para agregar nuevas transacciones a la lista .
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
