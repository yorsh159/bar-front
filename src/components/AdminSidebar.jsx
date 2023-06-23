import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth'


export default function AdminSidebar() {

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
            <Link to='/admin' className="font-bold text-lg border w-full p-2 hover:bg-blue-500">Pedidos</Link>
            <Link to='/admin/boletas' className="font-bold text-lg border w-full p-2 hover:bg-blue-500">Generar Tickets</Link>
            <Link to='/admin/verboletas' className="font-bold text-lg border w-full p-2 hover:bg-blue-500">Ver Tickets</Link>
            <Link to='/admin/comisiones' className="font-bold text-lg border p-2 hover:bg-blue-500">Comisiones</Link>
            <Link to='/admin/productos' className="font-bold text-lg border p-2 hover:bg-blue-500">Productos</Link>
            <Link to='/admin/mesas' className="font-bold text-lg border p-2 hover:bg-blue-500">Mesas</Link>
            <Link to='/admin/ingresos' className="font-bold text-lg border p-2 hover:bg-blue-500">Ingresos</Link>
            <Link to='/admin/horario' className="font-bold text-lg border p-2 hover:bg-blue-500">Horario</Link>
            <Link to='/admin/administracion' className="font-bold text-lg border p-2 hover:bg-blue-500">Administración</Link>
            <Link to='/admin/maestros' className="font-bold text-lg border p-2 hover:bg-blue-500">Maestros</Link>
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
