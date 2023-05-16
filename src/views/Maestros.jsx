import { Link } from "react-router-dom";

export default function Maestros() {
  return (
    <div>
        <h1 className='text-4xl font-black'>Maestros</h1>  
        

        <div className="flex flex-row p-4 text-4xl text-center">
            <div className="w-2/5 mt-5">
               <Link to='/admin/maestros/formapago' className="flex flex-col hover:bg-blue-500">
                    Formas de Pago     
               </Link> 
               
            </div>
            
        </div>
    </div>
  )
}
