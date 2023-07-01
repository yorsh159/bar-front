import React from 'react'
import moment from "moment";
import { formatNumero } from "../helpers";
import useBar from '../hooks/useBar'

export default function Liquidacion() {

  const{ventaTotal,metPag,comision,ventas,pedidoLibre}=useBar();

  return (
    <div>
      <h1 className='text-4xl font-black text-gray-200'>Liquidación</h1>

      <div className="p-5 border-b shadow  bg-white">
        <p className="text-xl font-bold text-slate-600">
          Venta del día
        </p>
        <p className='font-light px-2'>
          {ventaTotal.map(total => {
            return (
              <p>
                Venta Total del día:
                <span> S/. {total.VentaTotal}</span>
              </p>
            )
          })}
        </p>
      </div>

      <div className="p-5 border-b shadow  bg-white">
        <p className="text-xl font-bold text-slate-600">
          Venta por método de pago:
        </p>
        <p className='font-light px-2'>
          {metPag.map(metodo => {
            return (
              <p>
                <span>{metodo.Metodo}: </span>
                <span> S/. {metodo.Total}</span>
              </p>
            )
          })}
        </p>
      </div>

      <div className="p-5 border-b shadow  bg-white">
        <p className="text-xl font-bold text-slate-600">
          Comisiones generadas
        </p>
        <p className='font-light px-2'>

          {comision.length === 0 ? (<p>No hay comisiones registradas</p>) : (comision.map(comision => {
            return (<p>
              <span>{comision.Metodo}: </span>
              <span>S/. {comision.Total}</span>
            </p>)
          }))}

        </p>
      </div>

      <div className="p-5 border-b shadow  bg-white">
        <p className="text-xl font-bold text-slate-600">
          Productos y servicios vendidos:
        </p>
        <p className='font-light px-2'>
          {ventas.map(ventas => {
            return (
              <div className='mb-2'>
                <p>{ventas.nombre} </p>
                <p>Cantidad: {''}
                  <span>{ventas.CantidadVendida}</span>
                </p>
                <p>Monto: {''}
                  S/. {ventas.monto}
                </p>
              </div>
            )
          })}
        </p>
      </div>

      <div>
        {pedidoLibre.map(libre => (
          <div key={libre.id} className="p-5 border-b shadow  bg-white">
            <p className="text-xl font-bold text-slate-600">
              Detalle de Pedido:
            </p>

            <p>
              Mesero:
              <span className="font-light px-2">{libre.user.name}</span>
            </p>

            <p>
              Mesa:
              <span className="font-light px-2">{libre.mesa}</span>
            </p>

            <p>
              Fecha:
              <span className="font-light px-2">{moment(libre.created_at).format('YYYY-MM-DD H:mm:ss')}</span>
            </p>

            {libre.productos.map(producto => (
              <div key={producto.id} className="border-b border-b-slate-200 last-of-type: border-none py-2">
                {/* <p className="text-sm">ID: {producto.id}</p> */}
                <p className="">{producto.nombre}</p>
                <p>
                  Cantidad: {''}
                  <span className="font-light">{producto.pivot.cantidad}</span>
                </p>

              </div>
            ))}

            <p>
              Total:
              <span className="px-2 font-bold">S./ {formatNumero(libre.total)}</span>
            </p>

            {libre.ticket_estado == 0 ? <p className="text-green-500 font-semibold text-lg">Estado: Libre</p> : <p className="text-red-500 font-semibold text-lg">Estado: En Ticket</p>}

          </div>
        ))}
      </div>
    </div>
  )
}
