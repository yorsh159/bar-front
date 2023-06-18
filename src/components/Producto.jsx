import { formatearDinero } from "../helpers"
import useBar from '../hooks/useBar'

export default function Producto({producto}) {

    const { handleClickModal, handleSetProducto} = useBar();
    const {nombre,imagen,precio} = producto

  return (
    <div className="border p-3 shadow bg-white">
        <img src={`/img/${imagen}`} 
             alt={`${nombre}`}
             className="w-full"
             />
        
        <div className="p-3">
            <h3 className="text-xl font-bold">{nombre}</h3>
            <p className="mt-5 font-bold text-2xl text-amber-400">
                {formatearDinero(precio)}
            </p>

            <button
                type="button"
                className="bg-amber-400 hover:bg-amber-500 text-white w-full mt-5 p-3 font-bold rounded-md"
                onClick={()=>{handleClickModal();
                              handleSetProducto(producto);}}
            >Agregar

            </button>

        </div>
    </div>

  )
}
