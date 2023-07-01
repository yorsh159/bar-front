import useBar from "../hooks/useBar";
import Modal from 'react-modal';
import { createRef, useState } from 'react';
import clienteAxios from "../config/axios";

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
  

export default function FormaPago() {

    const nombreRef = createRef();

    const {handleClickModalFormaPago,modalFormaPago,formaPagos} = useBar();

    const handleClickFormaPago = async e=>{
        e.preventDefault()

        const token = localStorage.getItem('AUTH_TOKEN')

        const datos = {
            nombre: nombreRef.current.value,
        }
        try {
            await clienteAxios.post('api/pagos',datos,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            handleClickModalFormaPago();
            console.log(datos)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickEliminarFormaPago = async id=>{
        
        const token = localStorage.getItem('AUTH_TOKEN')

        try {
        if(window.confirm('Está eliminando un producto')){
          await clienteAxios.delete(`api/pagos/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
          })
          console.log(id)
          window.location.reload()
        }else{
          
        };
          
        } catch (error) {
          console.log(error)
        }
      }

  return (

    <div>
        <h1 className='text-4xl font-black text-gray-200'>Forma de Pago</h1>
        <p className='text-2xl my-6 text-gray-200'>Lista de usuarios</p>

        <button
            type="button"
            className="bg-amber-400 hover:bg-amber-500 text-white mt-2 p-3 font-bold rounded-md"
            onClick={() => {
                handleClickModalFormaPago();
            }}
        >
        Nueva Forma de Pago

      </button>

      <Modal isOpen={modalFormaPago} style={customStyles}>
        <div>
            <div className="flex justify-between">
                <h1 className="text-2xl font-black">Forma de Pago</h1>
                <button onClick={handleClickModalFormaPago}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>

        <div className="bg-white shadow-md rounded-md px-2 py-2">

            <form>

            {/* {errores ? errores.map(error=> <p key={error.id}>{error}</p>) : null } */}

              <div className="mb-4">
                <label
                  className="text-slate-800"
                  htmlFor="nombre"
                >
                  Nombre:
                </label>

                <input
                  type="text"
                  id="nombre"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="nombre"
                  placeholder="Forma de pago"
                  ref={nombreRef}

                />
              </div>

              <button onClick={handleClickFormaPago}
                      className="bg-slate-900 hover:bg-slate-700 text-white p-3 rounded-md font-semibold">
                Guardar
              </button>                 
            </form>
            </div>

      </Modal>

      <div className="mt-5">
        <table className="w-full text-center font-light bg-white">
          <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
            <tr>
              <th scope="col" className=" px-6 py-4">Nombre</th>
              <th scope="col" className=" px-6 py-4">Eliminar</th>
            </tr>
          </thead>

          <tbody>
            {formaPagos.map(formaPago=>{
              return(
                <tr key={formaPago.id} className="border-b dark:border-neutral-500 h-16">
                    <td className="text-lg">{formaPago.nombre}</td>
                    <td>
                       <button onClick={()=>handleClickEliminarFormaPago(formaPago.id)}>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                         </svg>
                       </button>
                  </td>
                </tr>
              )
            })}
          </tbody>

        </table>
      </div>

    </div>

  )
}
