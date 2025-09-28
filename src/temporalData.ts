export const temporalData = {
  sucursalesTipo: [{ id: 1, nombre: 'Ferreteria' }],
  sucursales: [
    {
      id: 1,
      nombre: 'Sucursal Central',
      descripcion:
        'Sucursal principal ubicada en el centro de la ciudad, ofrece atención personalizada y gran variedad de productos.',
      direccion: 'Calle Principal 123',
      tipo_sucursal_id: 1,
    },
    {
      id: 2,
      nombre: 'Sucursal Norte',
      descripcion:
        'Sucursal ubicada en la zona norte, especializada en herramientas y materiales de construcción.',
      direccion: 'Avenida Norte 456',
      tipo_sucursal_id: 1,
    },
    {
      id: 3,
      nombre: 'Sucursal Sur',
      descripcion:
        'Sucursal en el sur de la ciudad, reconocida por su rápido servicio y amplio stock de productos.',
      direccion: 'Boulevard Sur 789',
      tipo_sucursal_id: 1,
    },
  ],
  usuarios: [
    { id: 1, nombre: 'Juan Pérez', rol: 'Administrador' },
    { id: 2, nombre: 'María Gómez', rol: 'Empleado' },
    { id: 3, nombre: 'Carlos López', rol: 'Cliente' },
  ],
  productos: [
    { id: 1, nombre: 'Producto A', precio: 100 },
    { id: 2, nombre: 'Producto B', precio: 200 },
    { id: 3, nombre: 'Producto C', precio: 300 },
  ],
  ordenes: [
    { id: 1, user_id: 1, producto_id: 2, cantidad: 1 },
    { id: 2, user_id: 2, producto_id: 1, cantidad: 3 },
    { id: 3, user_id: 3, producto_id: 3, cantidad: 2 },
  ],
  paises: [
    { id: 1, nombre: 'Colombia' },
    { id: 2, nombre: 'Argentina' },
    { id: 3, nombre: 'Chile' },
  ],
  departamentos: [
    { id: 1, pais_id: 1, nombre: 'Magdalena' },
    { id: 2, pais_id: 1, nombre: 'Cundinamarca' },
    { id: 3, pais_id: 2, nombre: 'Buenos Aires' },
  ],
  ciudades: [
    { id: 1, departamento_id: 1, nombre: 'Santa Marta' },
    { id: 2, departamento_id: 1, nombre: 'Ciénaga' },
    { id: 3, departamento_id: 2, nombre: 'Bogotá' },
    { id: 4, departamento_id: 3, nombre: 'La Plata' },
  ],
  direcciones: [
    {
      id: 1,
      nombre: 'Casa',
      detalles: 'Calle 10 #20-30, Barrio Centro',
      barrio_id: 1,
      ciudad_id: 1,
      departamento_id: 1,
      pais_id: 1,
      latitud: 10.123456,
      longitud: -74.123456,
    },
    {
      id: 2,
      nombre: 'Oficina',
      detalles: 'Avenida 5 #15-25, Barrio Norte',
      barrio_id: 2,
      ciudad_id: 3,
      departamento_id: 2,
      pais_id: 1,
      latitud: 10.654321,
      longitud: -74.654321,
    },
  ],
}
