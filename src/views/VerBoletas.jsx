import  useSWR from "swr";
import clienteAxios from '../config/axios';
import useBar from "../hooks/useBar";
import { Link } from "react-router-dom";

export default function VerBoletas() {

  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clienteAxios('api/boletas',{
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })

  const {data, error, isLoading} = useSWR('api/boletas',fetcher /*,{refreshInterval:5000}*/)

  const handleClickEliminarBoleta = async ({boleta},id)=>{

        try {

            const datos = {
                
                id:boleta.id,
                pedidos:boleta.pedidos.map(pedido=>{
                    return{
                        id:pedido.id
                    }
                })
                
            }

            const respuesta = await clienteAxios.put(`api/boletas/${id}`,datos,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            //console.log(respuesta)
            console.log(datos)
        } catch (error) {
            console.log(error)
        }


  }
  //const {boletas} = useBar();

  //console.log(data)

  if(isLoading) return 'Cargando...' 

  return (
    <div>
        <h1 className='text-4xl font-black text-gray-200'>Notas de Venta</h1>
            <p className='text-2xl my-6 text-gray-200'>
             Lista de Notas de venta
            </p>

            <Link to='http://bar.milenium2022.net/ticket' target="_blank" className="bg-amber-400 hover:bg-amber-500 text-white p-3 font-bold rounded-md">Ver Detalles</Link> 

        <div className="mt-5">
            {data.data.data.map(boleta=>(
                <div key={boleta.id}  className="p-5 border-b-8 shadow bg-white">
                    <p className="text-xl font-bold text-slate-600">
                        Detalle de la Nota de Venta:
                    </p>
                    {boleta.pedidos.map(pedido=>(
                        <div key={pedido.id} className="border-b border-b-slate-200 last-of-type:border-none py-2">
                            <p className="">Id del Pedido: {pedido.id}</p>
                            <p>
                                Total: S./
                                <span className="font-light">{pedido.total}</span>
                            </p>
                            <p>
                                <span className="font-light">Mesa: {pedido.mesa}</span>
                            </p>
                        </div>

                    ))}

                    <p>
                        <span className="font-light">Caja: {boleta.user.name} </span>
                    </p>

                    <p>
                        <span className="font-bold">Total: {boleta.total} </span>
                    </p>
                    <button onClick={()=>handleClickEliminarBoleta({boleta},boleta.id)}
                            className="bg-red-600 hover:bg-red-700 rounded font-bold text-white text-center px-5 py-2 mt-3"
                            
                        >
                        Anular Nota de Venta
                        </button>
                </div>
            ))}
        </div>


    </div>
  )
}
