
import moment from "moment";
import { formatNumero } from "../../helpers";
import useBar from "../../hooks/useBar";
import clienteAxios from "../../config/axios";


export default function PedidoSup() {
    const {pedidosAll} = useBar();

    const token = localStorage.getItem('AUTH_TOKEN')

    const clickEliminarPedido = async(id)=>{
      console.log(id)
      try {
        if(window.confirm('Está eliminando un pedido')){
          await clienteAxios.put(`api/pedidos/${id}`,'',{headers:{
            Authorization: `Bearer ${token}`
            }})
          window.location.reload()
        }else{

        }
      } catch (error) {
        console.log(error)
      }
    }
 
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

              <p className="font-bold">ID: {pedido.id}</p> 
  
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
            
               { pedido.ticket_estado == 0  ? 
                <div>
                  <p className="text-green-500 font-semibold text-lg">Estado: Libre </p>
                  <button onClick={()=>clickEliminarPedido(pedido.id)}
                          className="bg-red-600 hover:bg-red-500 rounded font-bold text-white text-center px-2 py-1 mt-3">Anular</button>
                </div>  
              : 
              <p className="text-red-500 font-semibold text-lg">Estado: En Ticket</p>}
           
            </div>
          ))}
        </div>
  
      </div>
    )
}
