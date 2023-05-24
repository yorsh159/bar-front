
import clienteAxios from '../config/axios';
import useSWR from "swr";
import useBar from '../hooks/useBar';
import { formatNumero } from '../helpers';
import { createRef , useState } from 'react';
import ResumenComision from '../components/ResumenComision';

export default function Comisiones() {

    
    const token = localStorage.getItem('AUTH_TOKEN')
    const fetcher = () => clienteAxios('api/pedidos', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
  

    const { data, error, isLoading } = useSWR('api/pedidos', fetcher /*,{refreshInterval:5000}*/) 
    const {notaComision,totalBoleta,subTotalBoleta,igvBoleta,handleClickAgregarNotaComision,colaboradores} = useBar();

    const comisionRef = createRef();
    const colaboradorRef = createRef();


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
                <h1 className='text-4xl font-black'>Pedidos</h1>
                <div className='h-screen overflow-y-scroll py-4'>
                    {data?.data?.data?.map(pedido => (
                        <div key={pedido.id} className="p-5 border-b shadow  bg-white mb-3">
                            <p className="text-xl font-bold text-slate-600">
                                Detalle de Pedido:
                            </p>
                            {pedido.productos.map(producto => (
                                <div key={producto.id} className="border-b border-b-slate-200 last-of-type: border-none py-2">
                                    {/* <p className="text-sm">ID: {producto.id}</p> */}
                                    <p className="">{producto.nombre}</p>
                                    <p>
                                        Cantidad: {''}
                                        <span className="font-light">{producto.pivot.cantidad}</span>
                                    </p>

                                </div>
                            ))}

                            <p>
                                Total:
                                <span className="px-2 font-bold">S./ {pedido.total}</span>
                            </p>

                            <p>
                                Mesero:
                                <span className="font-light px-2">{pedido.user.name}</span>
                            </p>

                            <p>
                                Mesa:
                                <span className="font-light px-2">{pedido.mesa}</span>
                            </p>

                            <p>
                                Fecha:
                                <span className="font-light px-2">{pedido.created_at}</span>
                            </p>

                            <button className="bg-red-600 hover:bg-red-700 rounded font-bold text-white text-center px-5 py-2 mt-3"
                                    onClick={()=>handleClickAgregarNotaComision(pedido)}
                            >

                                Agregar
                            </button>

                        </div>
                    ))}
                </div>
                
            </div>

            <div className="w-2/3 ml-3">

                <h1 className="text-4xl font-black">Comisión</h1>

                <div className='flex flex-col'> 

                    <div className='bg-white h-96 overflow-y-scroll py-4'>
                        
                        {notaComision.length === 0 ? (
                            <p>Agregue Notas de pedido</p>
                        ) : (
                            notaComision.map(pedido=>(
                                <ResumenComision
                                    key={pedido.id}
                                    pedido={pedido}
                                />
                            ))
                        ) }
                    </div>

                    <div className='txt-lg font-semibold mt-3'>Subtotal: S./
                         {formatNumero(subTotalBoleta)}
                    </div>

                    <div className='txt-lg font-semibold'> IGV: S./
                         {formatNumero(igvBoleta)}       
                    </div>

                    <div className='text-lg font-bold py-3'>Total: S./{''}
                         {formatNumero(totalBoleta)}
                    </div>
                    
                    <div>
                        <label htmlFor="comision">Comision a Pagar: S./ </label>
                        <input type="text" name="comision" id="comision" className="ml-3 mt-2 p-2 rounded bg-gray-50" placeholder="" ref={comisionRef} />
                    </div>
                    <div>
                        <label htmlFor="colaborador">Colaborador: </label>
                        <select name="colaborador" id="colaborador" className="ml-3 mt-2 p-3 bg-gray-50" ref={colaboradorRef}>
                            {colaboradores.map(colaborador=>{
                                return(
                                    <option value={colaborador.id}>{colaborador.nombre}</option>
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
