import { Link } from "react-router-dom";

export default function AdministracionSup() {
    return (
        <div>
            <h1 className='text-4xl font-black text-gray-200'>Adminstracion</h1>  
            <p className='text-2xl my-6 text-gray-200'>Bienvenido a la administracion de usuarios</p>
    
            <div className="flex flex-row p-4 text-4xl text-center">
                <div className="w-full">
                   <Link to='/supervisor/administracion/usuario' className="flex flex-col hover:bg-blue-500 text-gray-200">
                        Usuarios     
                   </Link> 
                </div>
                <div className="w-full">
                    <Link to='/supervisor/administracion/colaborador' className="flex flex-col hover:bg-blue-500 text-gray-200">
                        Colaborador
                    </Link> 
                </div>
               
            </div>
    
        </div>
      )
}
