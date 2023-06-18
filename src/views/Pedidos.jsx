import  useSWR from "swr";
import clienteAxios from '../config/axios';
import moment from "moment";
import { formatNumero } from "../helpers";
import useBar from "../hooks/useBar";



export default function Pedidos() {

  const {pedidosAll} = useBar();
 
  return (
    <div>
      <h1 className='text-4xl font-black text-gray-200'>Pedidos</h1>
      <p className='text-2xl my-6 text-gray-200'>
        Nota de venta
      </p>

      <div>
      {pedidosAll.map(pedido=>(
          <div key={pedido.id} className="p-5 border-b shadow  bg-white">
            <p className="text-xl font-bold text-slate-600">
              Detalle de Pedido:
            </p>

             <p>
               Mesero:
               <span className="font-light px-2">{pedido.user.name}</span>
             </p>

             <p>
               Mesa:
               <span className="font-light px-2">{pedido.mesa}</span>
             </p>

             <p>
               Fecha:
               <span className="font-light px-2">{moment(pedido.created_at).format('YYYY-MM-DD H:mm:ss')}</span>
             </p>

             {pedido.productos.map(producto=>(
              <div key={producto.id} className="border-b border-b-slate-200 last-of-type: border-none py-2">
                  {/* <p className="text-sm">ID: {producto.id}</p> */}
                  <p className="">{producto.nombre}</p>
                  <p>
                      Cantidad: {''}
                      <span className="font-light">{producto.pivot.cantidad}</span>
                  </p>

              </div>
             )) }

             <p>
              Total: 
              <span className="px-2 font-bold">S./ {formatNumero(pedido.total)}</span>
             </p>
          
             { pedido.ticket_estado == 0  ? <p className="text-green-500 font-semibold text-lg">Estado: Libre</p> : <p className="text-red-500 font-semibold text-lg">Estado: En Ticket</p>}
         
          </div>
        ))}
      </div>

    </div>
  )
}
