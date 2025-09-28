import { FC } from 'react'
import { ModalComponent } from '@/components/Modal'
import { useAppStore } from '@/stores/appStore'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/formui/Textarea'
import { ErrorSpanMessage } from '@/components/ui/ErrorSpanMessage'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/formui/Input'
import { Select } from '@/components/ui/formui/Select'
import { Loading } from '@/components/ui/Loading'
import { FaCircleXmark } from 'react-icons/fa6'
import { FacturaType } from '@/types/modelTypes'
import { useFacturasStore } from '@/stores/models/Facturas'
import { useDivisaStore } from '@/stores/models/Divisas'
import { useTiposDocumentosStore } from '@/stores/models/TiposDocumentos'

type FormType = Omit<FacturaType, 'id'>

const formNewBranchRules = {
  divisa_id: {
    required: { value: true, message: 'Divisa requerida' },
  },
  monto: {
    required: { value: true, message: 'Monto requerido' },
    pattern: {
      value: /^[1-9]\d*(?:[.,]\d{1,2})?$/,
      message: 'El monto debe ser valor numerico, mayor a cero con maximo dos decimales',
    },
  },
  descripcion: {
    required: { value: true, message: 'Campo requerido' },
  },
  transactor: {
    required: { value: true, message: 'Campo requerido' },
  },
  documento: {
    required: { value: true, message: 'Documento requerido' },
    pattern: {
      value: /^[0-9]{5,10}$/,
      message: 'El número de documento debe contener solo dígitos (5 - 10)',
    },
  },
  tipo_documento_id: {
    required: { value: true, message: 'Tipo de documento requerido' },
  },
  numero_tarjeta: {
    required: { value: true, message: 'Campo requerido' },
    pattern: {
      value: /^[0-9]{13,19}$/,
      message: 'El número de tarjeta debe contener solo dígitos (13 - 19)',
    },
  },
  fecha_vencimiento_tarjeta: {
    required: { value: true, message: 'Campo requerido' },
    validate: (value: string) => {
      const today = new Date().toISOString().split('T')[0]
      return value >= today || 'La fecha debe ser mayor o igual a hoy'
    },
  },
  codigo_seguridad_tarjeta: {
    required: { value: true, message: 'Campo requerido' },
    pattern: {
      value: /^[0-9]{3,4}$/,
      message: 'El codigo de seguridad debe contener solo dígitos (3 - 4)',
    },
  },
}

export const FormNewTransaction: FC = () => {
  const { mode, loading, showModal, setMode, switchShowModalNew, setLoading } = useAppStore()
  const { tiposDocumentos } = useTiposDocumentosStore()
  const { divisas } = useDivisaStore()
  const { inputModel, resetInputModel, storeFactura, updateFactura } = useFacturasStore()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>()

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    setLoading({ value: true, id: 0, type: 'formSubmit' })
    if (mode == 'creacion') {
      await storeFactura(data)
    } else {
      await updateFactura(inputModel.id, data)
    }
    onCancel()
    setLoading({ value: false, id: 0, type: 'formSubmit' })
  }

  const onCancel = () => {
    switchShowModalNew(false)
    setMode('lectura')
    resetInputModel()
    reset()
  }

  return (
    <ModalComponent show={showModal} switchShow={onCancel}>
      <div className="grid w-[20rem] gap-4 p-3 md:w-[40rem]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl">Información de transacción</h2>
          <FaCircleXmark
            className="cursor-pointer object-cover text-xl text-accent2"
            onClick={onCancel}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
          <div className="w-inherit grid gap-4">
            <div className="grid gap-4 md:grid md:gap-8">
              <div className="grid gap-4 sm:flex sm:w-full sm:gap-4">
                <label htmlFor="transactor" className="grid w-full gap-2">
                  <div className="grid">
                    <span>Nombre del transactor</span>
                    {errors.transactor && (
                      <ErrorSpanMessage errorMessage={errors.transactor.message!} />
                    )}
                  </div>
                  <Input
                    defaultValue={inputModel.transactor}
                    name="transactor"
                    register={register}
                    formRules={formNewBranchRules}
                    type="text"
                    autoComplete="off"
                    maxLength={255}
                  />
                </label>
                <label htmlFor="documento" className="grid gap-2">
                  <div className="grid">
                    <span>Documento</span>
                    {(errors.documento || errors.tipo_documento_id) && (
                      <ErrorSpanMessage
                        errorMessage={
                          errors.documento
                            ? errors.documento.message!
                            : errors.tipo_documento_id!.message!
                        }
                      />
                    )}
                  </div>
                  <div className="flex items-end gap-4">
                    <Input
                      defaultValue={inputModel.documento}
                      name="documento"
                      register={register}
                      formRules={formNewBranchRules}
                      type="string"
                      maxLength={10}
                      autoComplete="off"
                    />
                    <Select
                      defaultValue={inputModel.tipo_documento_id}
                      name="tipo_documento_id"
                      register={register}
                      formRules={formNewBranchRules}
                      selectOptions={tiposDocumentos}
                    />
                  </div>
                </label>
              </div>
              <div className="grid gap-4 sm:flex sm:w-full sm:gap-4">
                <label htmlFor="numero_tarjeta" className="grid w-1/2 gap-2">
                  <div className="grid">
                    <span>Número de tarjeta</span>
                    {errors.numero_tarjeta && (
                      <ErrorSpanMessage errorMessage={errors.numero_tarjeta.message!} />
                    )}
                  </div>
                  <Input
                    defaultValue={inputModel.numero_tarjeta}
                    name="numero_tarjeta"
                    register={register}
                    formRules={formNewBranchRules}
                    type="string"
                    maxLength={19}
                    autoComplete="off"
                  />
                </label>
                <label htmlFor="fecha_vencimiento_tarjeta" className="grid w-2/6 gap-2">
                  <div className="grid">
                    <span>Fecha de vencimiento</span>
                    {errors.fecha_vencimiento_tarjeta && (
                      <ErrorSpanMessage errorMessage={errors.fecha_vencimiento_tarjeta.message!} />
                    )}
                  </div>
                  <div className="flex items-end gap-4">
                    <Input
                      defaultValue={inputModel.fecha_vencimiento_tarjeta}
                      name="fecha_vencimiento_tarjeta"
                      register={register}
                      formRules={formNewBranchRules}
                      type="date"
                      autoComplete="off"
                    />
                  </div>
                </label>
                <label htmlFor="codigo_seguridad_tarjeta" className="grid w-2/6 gap-2">
                  <div className="grid">
                    <span>Codigo de seguridad</span>
                    {errors.codigo_seguridad_tarjeta && (
                      <ErrorSpanMessage errorMessage={errors.codigo_seguridad_tarjeta.message!} />
                    )}
                    <Input
                      defaultValue={inputModel.codigo_seguridad_tarjeta}
                      name="codigo_seguridad_tarjeta"
                      register={register}
                      formRules={formNewBranchRules}
                      type="string"
                      maxLength={4}
                      autoComplete="off"
                    />
                  </div>
                </label>
              </div>
              <label htmlFor="monto" className="grid gap-2">
                <div className="grid">
                  <span>Monto</span>
                  {(errors.monto || errors.divisa_id) && (
                    <ErrorSpanMessage
                      errorMessage={
                        errors.monto ? errors.monto.message! : errors.divisa_id!.message!
                      }
                    />
                  )}
                </div>
                <div className="flex items-end gap-4">
                  <Input
                    defaultValue={inputModel.monto}
                    name="monto"
                    register={register}
                    formRules={formNewBranchRules}
                    type="string"
                    autoComplete="off"
                    maxLength={13}
                  />
                  <Select
                    defaultValue={inputModel.divisa_id}
                    name="divisa_id"
                    register={register}
                    formRules={formNewBranchRules}
                    selectOptions={divisas}
                  />
                </div>
              </label>
              <label htmlFor="descripcion" className="grid gap-2">
                <div className="grid">
                  <span>Descripción de la transacción</span>
                  {errors.descripcion && (
                    <ErrorSpanMessage errorMessage={errors.descripcion.message!} />
                  )}
                </div>
                <Textarea
                  defaultValue={inputModel.descripcion}
                  name="descripcion"
                  register={register}
                  formRules={formNewBranchRules}
                  autoComplete="off"
                  rows={2}
                  maxLength={255}
                />
              </label>
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <Button
              disabled={loading.value}
              type="submit"
              className="group flex w-[4rem] cursor-pointer items-center justify-center rounded border border-accent1 bg-sec px-2 py-1 text-center text-accent1 duration-300 hover:bg-accent1 hover:text-sec focus:outline-none"
            >
              {loading.value && loading.type == 'formSubmit' ? (
                <Loading
                  svgClasses="!w-[1rem] !h-[1rem] group-hover:text-white group-hover:fill-accent3 duration-300 "
                  color="white"
                  bgColor="accent3"
                />
              ) : (
                <span>{mode == 'creacion' ? 'Pagar' : 'Editar'}</span>
              )}
            </Button>
            <span
              className="w-fit cursor-pointer rounded border border-gray-200 bg-sec px-2 py-1 text-center text-gray-700 duration-300 hover:bg-gray-600 hover:text-gray-200 focus:outline-none"
              onClick={onCancel}
            >
              Volver
            </span>
          </div>
        </form>
      </div>
    </ModalComponent>
  )
}
