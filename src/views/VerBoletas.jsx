import  useSWR from "swr";
import clienteAxios from '../config/axios';
import useBar from "../hooks/useBar";

export default function VerBoletas() {

  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clienteAxios('api/boletas',{
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })

  const {data, error, isLoading} = useSWR('api/boletas',fetcher /*,{refreshInterval:5000}*/)

  //const {boletas} = useBar();

  console.log(data)

  if(isLoading) return 'Cargando...' 

  return (
    <div>
        <h1 className='text-4xl font-black'>Pedidos</h1>
            <p className='text-2xl my-6'>
             Lista de Boletas
            </p>

        <div>
            {data.data.data.map(boleta=>(
                <div  className="p-5 border-b-8 shadow bg-white">
                    <p className="text-xl font-bold text-slate-600">
                        Detalle de la boleta:
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
                </div>
            ))}
        </div>

        {/* <div>
            {data.data.data.map(boleta=>(
                <div  className="p-5 border-b-8 shadow bg-white">
                    <p className="text-xl font-bold text-slate-600">
                        Detalle de la boleta:
                    </p>
        
                    <p>
                        <span className="font-bold">Id Boleta: {boleta.boleta_id} </span>
                    </p>
                    <p>
                        <span className="font-bold">Total: {boleta.nombre} </span>
                    </p>

                    <p>
                        <span className="font-bold">Total: {boleta.precio} </span>
                    </p>

                    <p>
                        <span className="font-light">Mesero: {boleta.total} </span>
                    </p>
                </div>
            ))}
        </div>
         */}

    </div>
  )
}
