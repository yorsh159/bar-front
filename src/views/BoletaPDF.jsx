
import ResumenBoleta from '../components/ResumenBoleta'
import clienteAxios from '../config/axios';
import useBar from '../hooks/useBar';
import useSWR from "swr";
import { formatNumero } from '../helpers';

import {Document, Page,Text, View} from "@react-pdf/renderer"



export default function BoletaPDF() {
    
    const token = localStorage.getItem('AUTH_TOKEN')
    const fetcher = () => clienteAxios('api/pedidos', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    

    const { data, error, isLoading } = useSWR('api/pedidos', fetcher /*,{refreshInterval:5000}*/)

    const {nota,handleClickAgregarNota,totalBoleta,subTotalBoleta,igvBoleta,formaPagos,pedido} = useBar();

  return (

    <div className='md:flex'>

<div className='w-1/3'>
                <h1 className='text-4xl font-black text-gray-200'>Pedidos</h1>
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
                
        <Document>
            <Page size="B5">
            <Text className="text-4xl font-semibold">Boleta</Text>

                <View className='flex flex-col'>            
                    <View className='bg-white h-fit py-4'>
                        
                    {nota.length === 0 ? (
                            <p>Agregue Notas de pedido</p>
                        ) : (
                            
                                <table>
                                    <thead>
                                        <td>Prod.</td>
                                        <td>Cant.</td>
                                        <td>Total.</td>
                                    </thead>
                                   { nota.map(pedido=>(
                                    <tbody>
                                        {pedido.productos.map(producto =>{
                                            return(
                                                <tr>
                                                    <td>{producto.nombre}</td>
                                                    <td>{producto.pivot.cantidad}</td>
                                                    <td>{pedido.total}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                        ))}
                                </table>
                        ) }
                    </View>

                    <View className='txt-lg font-semibold mt-3'>Subtotal: S./
                         {formatNumero(subTotalBoleta)}
                    </View>

                    <View className='txt-lg font-semibold'> IGV: S./
                         {formatNumero(igvBoleta)}       
                    </View>

                    <View className='text-lg font-bold py-3'>Total: S./{''}
                         {formatNumero(totalBoleta)}
                    </View>

                </View>
            </Page>
        </Document>

            <button className='bg-red-600 hover:bg-red-700 px-5 py-2 rounded font-bold text-white text-center'>
                Descargar PDF
            </button>

        </div>
    
        </div>
  )
}


