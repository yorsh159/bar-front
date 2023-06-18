
import clienteAxios from '../config/axios';
import useSWR from "swr";
import useBar from '../hooks/useBar';
import { formatNumero } from '../helpers';
import { createRef , useState } from 'react';
import ResumenComision from '../components/ResumenComision';

export default function Comisiones() {

    
    const token = localStorage.getItem('AUTH_TOKEN')
    const fetcher = () => clienteAxios('api/boletaComision', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    
    

    const { data, error, isLoading } = useSWR('api/boletaComision', fetcher /*,{refreshInterval:5000}*/) 
    //console.log(data)
    const {notaComision,totalBoleta,handleClickAgregarNotaComision,marcacion,comisionBoleta} = useBar();

    const comisionRef = createRef();
    const colaboradorRef = createRef();
    console.log(comisionBoleta)


    const handleSubmitComision = async e=>{
        e.preventDefault()

        const token = localStorage.getItem('AUTH_TOKEN')
        try {

            const datos = {
                comision: comisionRef.current.value,
                colaborador: colaboradorRef.current.value,
                totalBoleta,
                notas: nota.map(pedido=>{
                    return{
                        id:pedido.id,
                        mesa:pedido.mesa
                        
                    }
                }),

                pedidos: nota.map(pedido=>{
                    return{  
                    pedido:pedido.productos.map(producto=>{
                        return{
                            nota:pedido.id,
                            id:producto.id,
                            cantidad:producto.pivot.cantidad,
                        }
                    })}
                }),
            
                
            }

            console.log(datos);

            await clienteAxios.post('api/comisiones',datos,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            //window.location.reload();
            
        } catch (error) {
            console.log(error)
        }
        
    }

  return (

    <div className='md:flex'>
        <div className='w-1/3'>
                <h1 className='text-4xl font-black text-gray-200'>Nota de Ventas</h1>
                <div className='h-screen overflow-y-scroll py-4'>
                    {data?.data?.data?.map(ticket => (
                        <div key={ticket.id} className="p-5 border-b shadow  bg-white mb-3">
                            <p className="text-xl font-bold text-slate-600">
                                Detalle de Nota de venta:
                            </p>

                            <p>
                                ID:
                                <span className="px-2 font-bold"> {ticket.boleta_id}</span>
                            </p>

                            <p>
                                Total:
                                <span className="px-2 font-bold">S./ {ticket.total_igv}</span>
                            </p>

                            <p>
                                Comision: 
                                <span className="px-2 font-bold">S./ {ticket.comision}</span>
                            </p>


                            <p>
                                Fecha:
                                <span className="font-light px-2">{ticket.created_at}</span>
                            </p>

                            <button className="bg-red-600 hover:bg-red-700 rounded font-bold text-white text-center px-5 py-2 mt-3"
                                    onClick={()=>handleClickAgregarNotaComision(ticket)}
                            >

                                Agregar
                            </button>

                        </div>
                    ))}
                </div>
                
            </div>

            <div className="w-2/3 ml-3">

                <h1 className="text-4xl font-black text-gray-200">Comisión</h1>

                <div className='flex flex-col'> 

                    <div className='bg-white h-96 overflow-y-scroll py-4'>
                        
                        {notaComision.length === 0 ? (
                            <p>Agregue Notas de pedido</p>
                        ) : (
                            notaComision.map(ticket=>(
                                <ResumenComision
                                    key={ticket.id}
                                    ticket={ticket}
                                />
                            ))
                        ) } 
                    </div>

                    <div className='text-lg font-bold py-3 text-gray-200'>Comision a Pagar: S./
                         {comisionBoleta}
                    </div>
                    
 
                    <div>
                        <label htmlFor="colaborador" className='text-gray-200'>Colaborador: </label>
                        <select name="colaborador" id="colaborador" className="ml-3 mt-2 p-3 bg-gray-50" ref={colaboradorRef}>
                            {marcacion.map(marcacion=>{
                                return(
                                    <option value={marcacion.id}>{marcacion.nombre}</option>
                                )
                            })}

                        </select>
                    </div>  

                     
                    
                    <form className='w-full'
                          onSubmit={handleSubmitComision}
                    >
                        <div className='mt-5'>
                            <input type="submit"
                                   value="Guardar"

                                   className='bg-red-600 hover:bg-red-700 px-5 py-2 rounded font-bold text-white text-center'
                             />
                        </div>
                    </form>      

                </div>

            </div>

    </div>
  )
}
