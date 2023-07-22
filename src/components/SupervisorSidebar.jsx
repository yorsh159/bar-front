import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export default function SupervisorSidebar() {
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
          <Link to='/supervisor/administracion' className="font-bold text-lg border w-full p-2 hover:bg-blue-500">Administracion</Link>  
          <Link to='/supervisor/comision' className="font-bold text-lg border w-full p-2 hover:bg-blue-500">Comision</Link>
          <Link to='/supervisor/horario' className="font-bold text-lg border w-full p-2 hover:bg-blue-500">Horario</Link>
          <Link to='/supervisor/verboletas' className="font-bold text-lg border w-full p-2 hover:bg-blue-500">Notas de Venta</Link>     
          <Link to='/supervisor/pedidos' className="font-bold text-lg border w-full p-2 hover:bg-blue-500">Pedidos</Link>            
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
