import { formatearDinero } from "../helpers";
import useBar from "../hooks/useBar";
import { useAuth } from '../hooks/useAuth';
import ResumenProducto from "./ResumenProducto";

export default function Resumen() {

  const{ pedido,total,handleSubmitNuevaOrden } = useBar();
  const{ logout } = useAuth({});

  const comprobarPedido = () => pedido.length === 0;
  //console.log(comprobarPedido())

  const handleSubmit = e => {
    e.preventDefault()

    handleSubmitNuevaOrden(logout);
  }


  return (
    <aside className="w-96 h-screen overflow-y-scroll p-5">
      <h1 className="text-4xl font-black">Pedido</h1>

      <div className="py-10">
        {pedido.length === 0 ? (
          <p className="text-cenet text-2xl">
            Ingrese productos
          </p>
        ):(
            pedido.map(producto=>(
                        <ResumenProducto
                          key={producto.id}
                          producto={producto}
                        />))
          )}
      </div>

      <p className="text-xl mt-10">
        Total:{''}
        {formatearDinero(total)}
      </p>
      <form className="w-full"
            onSubmit={handleSubmit}
      >
        <div className="mt-5">
          <input 
                 type="submit"
                 className={`${comprobarPedido() ? 'bg-red-200':'bg-amber-400 hover:bg-amber-500'} px-5 py-2 rounded
                            font-bold text-white text-center w-full h-16`}
                 value="Confirmar Pedido"
                 disabled={comprobarPedido()}
          />
        </div>
      </form>
    </aside>
  )
}
