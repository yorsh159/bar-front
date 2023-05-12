import { formatearDinero } from "../helpers";
import useBar from "../hooks/useBar";
import { useAuth } from '../hooks/useAuth';
import ResumenProducto from "./ResumenProducto";
import { createRef , useState } from 'react';
import clienteAxios from '../config/axios';
import { toast } from 'react-toastify';


export default function Resumen() {

  const{ pedido,total,handleSubmitNuevaOrden,mesas } = useBar();
  const{ logout } = useAuth({});

  const comprobarPedido = () => pedido.length === 0;
  //console.log(comprobarPedido())

  const mesaRef = createRef();
 
  
  const handleSubmit = async e => {
    e.preventDefault()

    //handleSubmitNuevaOrden(logout);

      const token = localStorage.getItem('AUTH_TOKEN')

      try {
          const{ data } = await clienteAxios.post('/api/pedidos',
          {
              
              mesa:mesaRef.current.value,
              total,
              productos: pedido.map(producto=>{
                  return{
                      id: producto.id,
                      cantidad: producto.cantidad,
                  }
              }),
          },
          {
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          })
          toast.success(data.message);
          setTimeout(()=>{
            
            //setPedido([])
          },1000);
          
          //Cerrar la sesión del usuario
          setTimeout(()=>{
          window.location.reload();
          localStorage.removeItem('AUTH_TOKEN');
          logout();
          },1000);

      } catch (error) {
          console.log(error)
      }
    

  }


  return (

    <aside className="w-96 h-screen overflow-y-scroll p-5">
      <h1 className="text-4xl font-black">Pedido</h1>

      <label htmlFor="mesa">Mesa: </label>
      <select name="mesa" id="mesa" className="ml-3 mt-2 p-3 bg-gray-50" ref={mesaRef}>
        {mesas.map(mesa => {
          return (
            <option key={mesa.id} value={mesa.nombre}>{mesa.nombre}</option>
          )
        }
        )}
      </select> 


      <div className="py-10">
        {pedido.length === 0 ? (
          <p className="text-cenet text-2xl">
            Ingrese productos
          </p>
        ):(
            pedido.map(producto=>(
                        <ResumenProducto
                          key={producto.id}
                          producto={producto}
                        />))
          )}
      </div>

      <p className="text-xl mt-10">
        Total:{''}
        {formatearDinero(total)}
      </p>
      <form className="w-full"
            onSubmit={handleSubmit}
      >
        <div className="mt-5">
          <input 
                 type="submit"
                 className={`${comprobarPedido() ? 'bg-red-200':'bg-amber-400 hover:bg-amber-500'} px-5 py-2 rounded
                            font-bold text-white text-center w-full h-16`}
                 value="Confirmar Pedido"
                 disabled={comprobarPedido()}
          />
        </div>
      </form>
    </aside>

    

  )
}
