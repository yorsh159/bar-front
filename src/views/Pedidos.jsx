import  useSWR from "swr";
import clienteAxios from '../config/axios';


export default function Pedidos() {

  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clienteAxios('api/pedidos',{
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })

  const {data, error, isLoading} = useSWR('api/pedidos',fetcher /*,{refreshInterval:5000}*/)

  console.log(data)

  if(isLoading) return 'Cargando...' 
 
  return (
    <div>
      <h1 className='text-4xl font-black text-gray-200'>Pedidos</h1>
      <p className='text-2xl my-6 text-gray-200'>
        Nota de venta
      </p>

      <div>
        {data.data.data.map(pedido=>(
          <div key={pedido.id} className="p-5 border-b shadow  bg-white">
            <p className="text-xl font-bold text-slate-600">
              Detalle de Pedido:
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
              <span className="px-2 font-bold">S./ {pedido.total}</span>
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
               <span className="font-light px-2">{pedido.created_at}</span>
             </p>

          </div>
        ))}
      </div>

    </div>
  )
}
