import { Link } from "react-router-dom";

export default function Maestros() {
  return (
    <div>
        <h1 className='text-4xl font-black text-gray-200'>Maestros</h1>  
        
        <div className="flex flex-row p-4 text-4xl text-center">
            <div className="w-2/5 mt-5">
               <Link to='/admin/mesas' className="flex flex-col hover:bg-blue-500 text-gray-200">
               <img src={`/img/mesa.png`} 
                 alt="Mesas"
                 className="w-fit ml-auto mr-auto"/>
                    Mesas    
               </Link>
            </div>
            <div className="w-2/5 mt-5">
                
               <Link to='/admin/productos' className="flex flex-col hover:bg-blue-500 text-gray-200">
               <img src={`/img/producto.png`} 
                 alt="Productos"
                 className="w-fit ml-auto mr-auto"/>
                    Productos    
               </Link>
            </div>
        </div>

        <div className="flex flex-row p-4 text-4xl text-center">  
            <div className="w-2/5 mt-5">
               <Link to='/admin/maestros/formapago' className="flex flex-col hover:bg-blue-500 text-gray-200">
               <img src={`/img/formapago.png`} 
                 alt="Forma Pago"
                 className="w-fit ml-auto mr-auto"/>
                    Formas de Pago     
               </Link>
            </div>
            <div className="w-2/5 mt-5">
               <Link to='/admin/maestros/incentivo' className="flex flex-col hover:bg-blue-500 text-gray-200">
               <img src={`/img/incentivo.png`} 
                 alt="Incentivo"
                 className="w-fit ml-auto mr-auto"/>
                    Incentivo
               </Link> 
            </div>             
        </div>

        <div className="flex flex-row p-4 text-4xl text-center">  
            <div className="w-2/5 mt-5">
               <Link to='/admin/liquidacion' className="flex flex-col hover:bg-blue-500 text-gray-200">
               <img src={`/img/formapago.png`} 
                 alt="Forma Pago"
                 className="w-fit ml-auto mr-auto"/>
                    Liquidación    
               </Link>
            </div>          
        </div>
    </div>
  )
}
