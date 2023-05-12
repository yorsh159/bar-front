
import ResumenBoleta from '../components/ResumenBoleta'
import clienteAxios from '../config/axios';
import useSWR from "swr";
import useBar from '../hooks/useBar';
import { createRef , useState } from 'react';

import { formatNumero } from '../helpers';


export default function Boletas() {

    const token = localStorage.getItem('AUTH_TOKEN')
    const fetcher = () => clienteAxios('api/pedidos', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    const { data, error, isLoading } = useSWR('api/pedidos', fetcher /*,{refreshInterval:5000}*/)

    const {nota,handleClickAgregarNota,totalBoleta,subTotalBoleta,igvBoleta} = useBar();

    console.log(data)
    console.log(error)
    console.log(isLoading)

    const dniRef = createRef();

    const handleSubmitBoleta = async e=>{
        e.preventDefault()

        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.post('api/boletas',{
                dni: dniRef.current.value,
                totalBoleta,
                nota: nota.map(pedido=>{
                    return{
                        id:pedido.id,
                        mesa:pedido.mesa,
                    }
                }),
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
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
                                    onClick={()=>handleClickAgregarNota(pedido)}
                            >

                                Agregar
                            </button>

                        </div>
                    ))}
                </div>
                
            </div>

            
            <div className="w-2/3 ml-3">
                <h1 className="text-4xl font-black">Boletas</h1>

                <div className='flex flex-col'>            
                    <div className='bg-white h-96 h-screen overflow-y-scroll py-4'>
                        
                        {nota.length === 0 ? (
                            <p>Agregue Notas de pedido</p>
                        ) : (
                            nota.map(pedido=>(
                                <ResumenBoleta
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
                        <label htmlFor="dni">DNI/RUC: </label>
                        <input type="text" name="dni" id="dni" ref={dniRef} />
                    </div>

                    <form className='w-full'
                          onSubmit={handleSubmitBoleta}
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