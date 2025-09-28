type UserType = {
  name: string
  email: string
  password: string
}

type FacturaType = {
  id: number
  divisa_id: number
  divisa: DividaType
  monto: number | ''
  descripcion: string
  transactor: string
  documento: string
  tipo_documento_id: number
  tipo_documento: TipoDocumentoType
  numero_tarjeta: string
  fecha_vencimiento_tarjeta: string
  codigo_seguridad_tarjeta: string
}

type TipoDocumentoType = {
  id: number
  nombre: string
  abreviatura: string
}

type DividaType = {
  id: number
  nombre: string
  abreviatura: string
}

export type { UserType, FacturaType }
