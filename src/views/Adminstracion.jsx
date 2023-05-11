import { Link } from "react-router-dom";
import {Outlet} from 'react-router-dom';

export default function Administracion() {
  return (
    <div>
        <h1 className='text-4xl font-black'>Adminstracion</h1>  
        <p className='text-2xl my-6'>Bienvenido a la administracion de usuarios</p>

        <div className="flex flex-row p-4 text-4xl text-center">
            <div className="w-full">
               <Link to='/admin/administracion/usuarios' className="flex flex-col hover:bg-blue-500">
                    Usuarios     
               </Link> 
               
            </div>
            <div className="w-full">
               <Link to='/admin/administracion/colaborador' className="flex flex-col hover:bg-blue-500">
                    Colaborador
               </Link> 
            </div>
        </div>

    </div>
  )
}
