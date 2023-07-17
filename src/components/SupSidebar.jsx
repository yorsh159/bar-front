import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth'

export default function SupSidebar() {

const {logout} = useAuth({middleware:'auth'});

  return (
    <aside className="md: w-52 h-screen">
        <div className="p-0">
            <img src="/img/logo.jpg" 
                 alt="Logo"
                 className="w-52" 
            />
        </div>

        <nav className="flex flex-col">
            <Link to='/caja/pedidos' className="font-bold text-lg border w-full p-2 hover:bg-blue-500">Pedidos</Link>     
            <Link to='/caja/boletas' className="font-bold text-lg border w-full p-2 hover:bg-blue-500">Generar Nota</Link>      
            <Link to='/caja/verboletas' className="font-bold text-lg border w-full p-2 hover:bg-blue-500">Notas de Venta</Link>
            <Link to='/caja/comision' className="font-bold text-lg border w-full p-2 hover:bg-blue-500">Comision</Link>
            
        </nav>

        <div className='my-5 px-5'>
        <button
            type="button"
            className="text-center bg-red-500 w-full p-3 font-bold text-white rounded-md"
            onClick={logout}
        >
          Cerrar Sesion
        </button>
      </div>

    </aside>
  )
}
