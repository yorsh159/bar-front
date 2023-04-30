import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth'


export default function AdminSidebar() {

    const {logout} = useAuth({middleware:'auth'});

  return (
    <aside className="md: w-60 h-screen">
        <div className="p-4">
            <img src="/img/logo1.jpg" 
                 alt="Logo"
                 className="w-56" 
            />
        </div>

        <nav className="flex flex-col">
            <Link to='/admin' className="font-bold text-lg border w-full p-3 hover:bg-blue-500">Pedidos</Link>
            <Link to='/admin/productos' className="font-bold text-lg border p-3 hover:bg-blue-500">Productos</Link>
            <Link to='/admin/mesas' className="font-bold text-lg border p-3 hover:bg-blue-500">Mesas</Link>
            <Link to='/admin/ingresos' className="font-bold text-lg border p-3 hover:bg-blue-500">Ingresos</Link>
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
