import useBar from "../hooks/useBar"



export default function ResumenComision({pedido}) {

    const {handleEliminarNotaComision} = useBar()

  return (
    <div className='shadow space-y-2 p-4 bg-white'>
      <div key={pedido.id} className='space-y-2'>
        <p className='text-lg font-bold'>Mesa:{pedido.mesa}</p>
        <p className='text-lg font-bold'>Mesero:{pedido.user.name}</p>
        <p className='text-lg '>Producto: {pedido.productos.map(producto => (
                                <div key={producto.id} className="border-b border-b-slate-200 last-of-type: border-none py-2">
                                    {/* <p className="text-sm">ID: {producto.id}</p> */}
                                    <p className="">{producto.nombre}</p>
                                    <p>
                                        Cantidad: {''}
                                        <span className="font-light">{producto.pivot.cantidad}</span>
                                    </p>

                                </div>
                                ))}
        </p>
        <p className='text-lg font-bold'>Total:{pedido.total}</p>      
        
        <button
              type="button"
              className="bg-red-700 p-2 text-white rounded-md font-bold uppercase shadow-md text-center"
              onClick={()=>handleEliminarNotaComision(pedido.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>

      </div>

    </div>
  )
}
