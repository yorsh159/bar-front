import {useState, useEffect} from 'react'
import useBar from "../hooks/useBar"
import { formatearDinero } from "../helpers";

export default function ModalProducto() {

  const {producto, handleClickModal, handleAgregarPedido, pedido} = useBar();
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);


  useEffect(()=>{
      if(pedido.some( pedidoState => pedidoState.id === producto.id )){
          const productoEdicion = pedido.filter( pedidoState => pedidoState.id === producto.id)[0]
          setCantidad(productoEdicion.cantidad)
          setEdicion(true)
      }
  },[pedido])

  return (
    
    <div className="md:flex gap-7">
      <div className="md: w-96">
        <img src={`/img/${producto.imagen}`} alt={`Imagen prodcuto ${producto.nombre}`} />
      </div>
      <div className="md: w-2/3">
        <div className="flex justify-end">
          <button onClick={handleClickModal}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <h1 className="text-3xl font-bold mt-5">
          {producto.nombre}
        </h1>
        <p className="mt-5 font-black text-3xl text-amber-500">
          {formatearDinero(producto.precio)}
        </p>

        <div className='flex gap-4 mt-5'>
          <button
                type='button'
                onClick={()=>{if(cantidad <= 1) return
                              setCantidad(cantidad-1)}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <p className='text-2xl'>{cantidad}</p>
          
          <button
                type='button'
                onClick={()=>{
                  setCantidad(cantidad+1)}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        
        <button 
            type="button"
            className="font-bold bg-amber-400 hover:bg-amber-500 
                       rounded-md text-white px-5 py-5 mt-5" 
            onClick={()=>{handleAgregarPedido({...producto, cantidad})
                          handleClickModal()}}
        >
          {edicion ? 'Guardar Cambios' : 'Añadir al pedido'}
        </button>

      </div>
    </div>
  )
}
