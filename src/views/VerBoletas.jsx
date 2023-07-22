import  useSWR from "swr";
import clienteAxios from '../config/axios';
import useBar from "../hooks/useBar";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import { createRef, useState } from 'react';

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
  
    },
  };
  
Modal.setAppElement('#root');

export default function VerBoletas() {

  const motivoRef = createRef();

  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clienteAxios('api/boletas',{
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })

  const {data, error, isLoading} = useSWR('api/boletas',fetcher /*,{refreshInterval:5000}*/)

  const handleClickEliminarBoleta = async ({boleta},id)=>{

        try {

            const datos = {
                
                id:boleta.id,
                motivo:motivoRef.current.value,
                pedidos:boleta.pedidos.map(pedido=>{
                    return{
                        id:pedido.id
                    }
                })
                
            }
            console.log(datos)
            const respuesta = await clienteAxios.put(`api/boletas/${id}`,datos,{
                headers:{
                Authorization: `Bearer ${token}`
                }
            })
            console.log(respuesta)
            //console.log(datos)
            //window.location.reload()
    
        } catch (error) {
            console.log(error)
        }


  }
  

  const {modalBoleta,handleClickModalBoleta,boleta,handleSetBoleta} = useBar();

  //console.log(data)

  if(isLoading) return 'Cargando...' 

  return (
    <div>
        <h1 className='text-4xl font-black text-gray-200'>Notas de Venta</h1>
            <p className='text-2xl my-6 text-gray-200'>
             Lista de Notas de venta
            </p>

            <Link to='http://127.0.0.1:8000/ticket' target="_blank" className="bg-amber-400 hover:bg-amber-500 text-white p-3 font-bold rounded-md">Ver Detalles</Link> 

        <div className="mt-5">
            {data.data.data.map(boleta=>(
                
                <div key={boleta.id}  className="p-5 border-b-8 shadow bg-white">            

                    <p className="text-xl font-bold text-slate-600">
                        Detalle de la Nota de Venta:
                    </p>

                    <p className="font-bold">Boleta ID: {boleta.id}</p> 

                    {boleta.pedidos.map(pedido=>(
                        <div key={pedido.id} className="border-b border-b-slate-200 last-of-type:border-none py-2">
                            <p className="">Id del Pedido: {pedido.id}</p>
                            <p>
                                Total: S./
                                <span className="font-light">{pedido.total}</span>
                            </p>
                            <p>
                                <span className="font-light">Mesa: {pedido.mesa}</span>
                            </p>
                        </div>

                    ))}

                    <p>
                        <span className="font-light">Caja: {boleta.user.name} </span>
                    </p>

                    <p>
                        <span className="font-bold">Total: {boleta.total} </span>
                    </p>
                        
                    <button onClick={()=>{handleClickModalBoleta()
                                          handleSetBoleta(boleta)}}
                            //onClick={()=>handleClickEliminarBoleta({boleta},boleta.id)}
                            className="bg-red-600 hover:bg-red-700 rounded font-bold text-white text-center px-5 py-2 mt-3"
                    >
                        Anular Nota de Venta
                    </button>
                </div>
            ))}

              

        </div>
        
        <Modal isOpen={modalBoleta} style={customStyles}>
            <div>
                <div className="flex justify-between gap-2">
                <h2 className="text-red-600 font-semibold rounded">ATENCIÓN! Está eliminando una nota de venta</h2>
                    <button onClick={handleClickModalBoleta}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
              
             <div className="mt-2">
              <p>
                Id de la Boleta: {boleta.id}
              </p>
              <p>
                {boleta?.pedidos?.map(pedido=>(
                    <p>Pedido: {pedido.id}</p>
                )

                )}
              </p>

                <div>
                    <label htmlFor="">Ingrese el motivo:</label>
                    
                </div>
                <div className="w-full">
                <textarea id="motivo" name="motivo" placeholder="Escriba el motivo..." cols="50" rows="5" ref={motivoRef}></textarea>
                </div>
                <button className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-md font-semibold"
                  onClick={() => {handleClickEliminarBoleta({ boleta }, boleta.id)
                                  handleClickModalBoleta()}}>
                  Enviar
                </button>

                <button className="bg-red-600 hover:bg-red-500 text-white p-2 ml-2 rounded-md font-semibold"
                  onClick={handleClickModalBoleta}>
                  Cancelar
                </button>
              </div> 
            </div>
              
        </Modal>
        


    </div>
  )
}
