import Categoria from './Categoria'
import useBar from '../hooks/useBar'
import { useAuth } from '../hooks/useAuth'


export default function Sidebar() {

  const {categorias, mesas} = useBar()
  const {logout,user} = useAuth({middleware:'auth'})

  return (
    <aside className="md:w-60">
      <div className="p-4">
        <img 
            className="w-40"
            src="img/logo.jpg" 
            alt="imagen logo" 
        />
      </div>

      <p className='text-center text-2xl font-bold'>Mesero: {user?.name}</p>

      <div className='mt-10'>
        {categorias.map( categoria =>(
          <Categoria
            key={categoria.id}
            categoria = {categoria} 
          />
        )
        )}
      </div>

      <div className='my-5 px-5'>
        <button
            type="button"
            className="text-center bg-red-500 w-full p-3 font-bold text-white rounded-md"
            onClick={logout}
        >
          Cerrar Sesión
        </button>
      </div>

    </aside>
  )
}
