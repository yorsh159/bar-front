
import ResumenBoleta from '../components/ResumenBoleta'
import clienteAxios from '../config/axios';
import useSWR, { mutate } from "swr";
import useBar from '../hooks/useBar';
import { createRef , useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import { formatNumero } from '../helpers';
import moment from "moment";
import { Link } from 'react-router-dom';
import dniAxios from '../config/dniaxios';



export default function Boletas() {

    const token = localStorage.getItem('AUTH_TOKEN')
    const fetcher = () => clienteAxios('api/pedidos', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    
    const { data, error, isLoading } = useSWR('api/pedidos', fetcher /*,{refreshInterval:1000}*/)

    const {nota,handleClickAgregarNota,totalBoleta,subTotalBoleta,igvBoleta,formaPagos,handleClickObtenerDni} = useBar();

    const[dni, setDni]=useState([])


    const dniRef = createRef();
    const nombreRef = createRef();
    const paternoRef = createRef();
    const maternoRef = createRef();
    const pagoRef = createRef();


    const handleSubmitBoleta = async e=>{
        //e.preventDefault()

        const token = localStorage.getItem('AUTH_TOKEN')

        const datos= {
            dni: dniRef.current.value,
            nombre:nombreRef.current.value,
            paterno:paternoRef.current.value,
            materno:maternoRef.current.value,
            pago: pagoRef.current.value,
            totalBoleta,
            igvBoleta,
            subTotalBoleta,
            nota: nota.map(pedido=>{
                return{
                    id:pedido.id,
                    mesa:pedido.mesa,
                }
            }),
        }

        try {
            await clienteAxios.post('api/boletas',datos,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            window.location.reload();
            console.log(datos)
        } catch (error) {
            console.log(error)
        }
        
    }

    const handlePedidoUpdate = async e=>{
        //e.preventDefault()
        const pedidoUpdate={
            nota: nota.map(pedido=>{
                return{
                    id:pedido.id,
                }
            }),
        }
        try {
            const respuesta = await clienteAxios.post('api/pedidoUpd',pedidoUpdate)
            console.log(respuesta.data.message)
            console.log(pedidoUpdate)
            //window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    const buscaDNI = async ()=>{
        const dni = dniRef.current.value;
        const token1='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1pbmRjb250cm9sNTY0QGdtYWlsLmNvbSJ9.YeJ-WwE2Xdnlm7-ZCufb2Wb_u9BjysN8vrQ8rS6Fpws';
        const busqueda = await dniAxios.get(`${dni}?token=${token1}`)
        setDni(busqueda.data)
        console.log(busqueda.data)
    }


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

                            <p>
                                Mesa:
                                <span className="font-light px-2">{pedido.mesa}</span>
                            </p>

                            <p>
                                Mesero:
                                <span className="font-light px-2">{pedido.user.name}</span>
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
                                Fecha:
                                <span className="font-light px-2">{moment(pedido.created_at).format('YYYY-MM-DD H:mm:ss')}</span>
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

                <h1 className="text-4xl font-black text-gray-200">Tickets</h1>

                <div className='flex flex-col'> 

                    <div className='bg-white h-96 overflow-y-scroll py-4'>
                        
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

                    <div className='txt-lg font-semibold mt-3 text-gray-200'>Subtotal: S./
                         {formatNumero(subTotalBoleta)}
                    </div>

                    <div className='txt-lg font-semibold text-gray-200'> IGV: S./
                         {formatNumero(igvBoleta)}       
                    </div>

                    <div className='text-lg font-bold py-3 text-gray-200'>Total: S./{''}
                         {formatNumero(totalBoleta)}
                    </div>

                    <div>
                        <label htmlFor="dni" className='text-lg font-bold py-3 text-gray-200'>DNI/RUC: </label>
                        <input type="text" name="dni" id="dni" className="ml-3 mt-2 p-2 rounded bg-gray-50" placeholder="DNI/RUC" ref={dniRef}  />
                        <button type="submit"
                                onClick={buscaDNI}
                                className='bg-red-600 hover:bg-red-700 px-5 py-2 ml-3 rounded font-bold text-white text-center'
                            >
                                Buscar
                            </button>

                    </div>

                    <div>
                        <input type="text" name="nombre" id="apaterno" className="mt-2 p-2 rounded bg-gray-50" placeholder="Nombres" ref={nombreRef}
                         value={dni.nombres}/>
                        <input type="text" name="paterno" id="paterno" className="ml-3 mt-2 p-2 rounded bg-gray-50" placeholder="Ap. paterno" ref={paternoRef}
                         value={dni.apellidoPaterno}/>
                        <input type="text" name="materno" id="materno" className="ml-3 mt-2 p-2 rounded bg-gray-50" placeholder="Ap. materno" ref={maternoRef}
                         value={dni.apellidoMaterno}/> 
                    </div>
                
                    <div>

                        <label htmlFor="pago" className='text-lg font-bold py-3 text-gray-200'>Método de pago: </label>
                        <select name="pago" id="pago" className="ml-3 mt-2 p-3 rounded bg-gray-50" ref={pagoRef}>
                            {formaPagos.map(formaPago=>{
                                return(
                                    <option value={formaPago.id}>{formaPago.nombre}</option>
                                )
                            })}

                        </select>
                    </div>  
                    
                    <form className='w-full'
                          onSubmit={handleSubmitBoleta}
                    >
                        
                    </form>

                    <div className='mt-5'>
                            <button type="submit"
                                    value="Guardar"
                                    onClick={()=>{handleSubmitBoleta()
                                                 handlePedidoUpdate()}}
                                    className='bg-red-600 hover:bg-red-700 px-5 py-2 rounded font-bold text-white text-center'
                            >
                                Guardar
                            </button>
                    </div>
                    

                    {/* <div className='mt-5'>
                    <Link to='/descarga' target="_blank" className='bg-red-600 hover:bg-red-700 px-5 py-2 rounded font-bold text-white text-center'>
                        Descargar Boleta
                    </Link>
                    </div>        */}

                </div>

            </div>

            <ToastContainer/>
     
        </div>


        
        
 

    )
}
