import clienteAxios from '../../config/axios';
import useSWR from "swr";
import useBar from '../../hooks/useBar';
import { formatNumero } from '../../helpers';
import { createRef , useState } from 'react';
import ResumenComision from '../../components/ResumenComision';
import ResumenColaborador from '../../components/ResumenColaborador';

export default function ComisionCompañiaCaja() {
    const token = localStorage.getItem('AUTH_TOKEN')
    const fetcher = () => clienteAxios('api/boletaComision', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    const { data, error, isLoading } = useSWR('api/boletaComision', fetcher /*,{refreshInterval:5000}*/) 
    //console.log(data)

    const comprobarComision = () => notaColaborador.length === 0 
    const comprobarColaborador = () => notaComision.length === 0
    
    const {notaComision,totalBoleta,handleClickAgregarNotaComision,marcacion,comisionBoleta,notaColaborador,handleClickNotaColaborador,comisionUnitaria} = useBar();
    //console.log(marcacion)
    //console.log(comisionBoleta)

    

    const handleSubmitComision = async e=>{
        e.preventDefault()

        const token = localStorage.getItem('AUTH_TOKEN')
        try {

            const datos = {
                comisionBoleta,
                comisionUnitaria,
                colaborador: notaColaborador.map(colaborador=>{
                    return{
                        id:colaborador.colaborador_id,
                        tipo:colaborador.tipo
                    }

                }),
                nota:notaComision.map(boleta=>{
                    return{
                        id:boleta.boleta_id,
                    }
                })
                
            }

           console.log(datos);

           await clienteAxios.post('api/comisiones',datos,
           {
               headers:{
                   Authorization: `Bearer ${token}`
               }
           })
           window.location.reload();
            
        } catch (error) {
            console.log(error)
        }
        
    }

  return (

    <div className='md:flex'>
            <div className='w-96 h-auto'>
                <h1 className='text-4xl font-black text-gray-200'>Nota de Ventas</h1>
                <div className='h-80 w-96 overflow-y-scroll py-2 px-2'>
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
                
                
                <h1 className='text-4xl font-black text-gray-200'> Colaborador </h1>
                <div className='h-80 w-96 overflow-y-scroll py-2 px-2'>
                  {marcacion.map(marcacion=>{
                    return(
                      <div key={marcacion.id} className="p-5 border-b shadow  bg-white mb-3">
                        <p>Nombre: {marcacion.nombre}</p>
                        <button className={`${comprobarColaborador() ? 'bg-red-400':'bg-red-600 hover:bg-red-7000'} px-5 py-2 rounded font-bold text-white text-center`}
                                disabled={comprobarColaborador()}
                                onClick={()=>handleClickNotaColaborador(marcacion)}
                        >
                        Agregar
                        </button>
                      </div>
                    )
                  })}
                </div>
                

            </div>

            

            <div className="w-2/3 ml-8">

                <h1 className="text-4xl font-black text-gray-200">Comisión</h1>

                <div className='flex flex-col'> 
                    <div className='flex flex-row'> 
                        <div className='bg-white w-1/2 h-96 overflow-y-scroll py-4 px-2'>
                        
                            {notaComision.length === 0 ? (
                                <p>Agregue Nota de venta</p>
                            ) : (
                                notaComision.map((ticket)=>(
                                    <ResumenComision
                                        key={ticket.id}
                                        ticket={ticket}
                                    />
                                ))
                            )}

                        </div>

                        <div className='bg-white w-1/2 h-96 overflow-y-scroll py-4 px-2 ml-3'> 
                            {notaColaborador.length === 0 ? (
                                <p>Agregue Colaborador</p>
                                ) : (
                                notaColaborador.map((marcacion)=>(
                                    <ResumenColaborador
                                        key={marcacion.id}
                                        marcacion={marcacion}
                                    />
                                ))
                            )}  
                        </div>
                    </div>

                    <div className='text-lg font-bold py-3 text-gray-200'>Comision a Pagar: S./
                         {comisionBoleta}
                    </div>

                    <div className='text-lg font-bold py-3 text-gray-200'>Comision por Usuario: S./
                         {comisionUnitaria}
                    </div>
                                
                    
                    <form className='w-full'
                          onSubmit={handleSubmitComision}
                    >
                        <div className='mt-5'>
                            <input type="submit"
                                   value="Guardar"
                                   disabled={comprobarComision()}
                                   className={`${comprobarComision() ? 'bg-red-400':'bg-red-600 hover:bg-red-7000'} px-5 py-2 rounded font-bold text-white text-center`}
                             />
                        </div>
                    </form>      

                </div>

            </div>

    </div>
  )
}
