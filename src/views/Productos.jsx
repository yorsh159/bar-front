import  useSWR from "swr";
import clienteAxios from '../config/axios';
import useBar from "../hooks/useBar";
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



export default function Productos() {

    const codigoRef = createRef();
    const nombreRef = createRef();
    const precioRef = createRef();
    const cantidadRef = createRef();
    const categoriaRef=createRef();
    const tipoRef = createRef();
    const imagenRef = createRef();

    const codigoEditRef = createRef();
    const nombreEditRef = createRef();
    const precioEditRef = createRef();
    const cantidadEditRef = createRef();
    const categoriaEditRef=createRef();
    const tipoEditRef = createRef();

    const [errores, setErrores] = useState([]);
    
    const handleSubmit = async e =>{
        e.preventDefault()
        
        // const datos = {
        //     codigo: codigoRef.current.value,
        //     nombre: nombreRef.current.value,
        //     precio: precioRef.current.value,
        //     cantidad: cantidadRef.current.value,
        //     categoria_id: categoriaRef.current.value,
        //     tipo: tipoRef.current.value,
        //     imagen: imagenRef.current.files[0].name,
        // }

        const datos = new FormData();
        datos.append('codigo',codigoRef.current.value);
        datos.append('nombre',nombreRef.current.value);
        datos.append('precio',precioRef.current.value);
        datos.append('cantidad',cantidadRef.current.value);
        datos.append('categoria_id',categoriaRef.current.value);
        datos.append('tipo',tipoRef.current.value);
        datos.append('imagen',imagenRef.current.files[0]);


        console.log(datos);

        try {
          const respuesta = await clienteAxios.post('api/productos',datos)
          console.log(respuesta);
          window.location.reload();
        } catch (error) {
          setErrores(Object.values(error.response.data.errors))
          console.log(Object.values(error.response.data.errors))
          console.log(error)
        }
            
       
    }

    const handleClickEliminarProducto = async id=>{
      try {
        await clienteAxios.delete(`api/productos/${id}`)
        console.log(id)
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    }

    const handleClickEditarProducto = async id=>{
  

      const datos = {
        codigo: codigoEditRef.current.value,
        nombre: nombreEditRef.current.value,
        precio: precioEditRef.current.value,
        cantidad: cantidadEditRef.current.value,
        categoria_id: categoriaEditRef.current.value,
        tipo: tipoEditRef.current.value,
      }

      try {
          await clienteAxios.put(`api/productos/${id}`,datos)
          //console.log(id)
          //console.log(datos)
          window.location.reload()
      } catch (error) {
          setErrores(Object.values(error.response.data.errors))
          console.log(Object.values(error.response.data.errors))
          console.log(error)
      }
    }


    
  const {handleClickModal,productos,modal,categorias,modalEdit,handleClickEditModal,producto,handleSetProducto} = useBar()
  
  

  return (
    <div>
      <h1 className='text-4xl font-black text-gray-200'>Productos</h1>
      <p className='text-2xl my-6 text-gray-200'>
        Lista de productos
      </p>


      <button
        type="button"
        className="bg-amber-400 hover:bg-amber-500 text-white mt-2 p-3 font-bold rounded-md"
        onClick={() => {
          handleClickModal();
        }}
      >
        Nuevo Producto

      </button>

      <Modal isOpen={modalEdit} style={customStyles}>
      <div className="overflow-y-scroll">
          <div className="flex justify-between">
            <h1 className="text-xl font-black">Editar Producto</h1>

            
              <button onClick={handleClickEditModal}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            
          </div>

          <div className="bg-white shadow-md rounded-md px-2 py-2">

            <form method="POST">

            {errores ? errores.map(error=> <p key={error.id}>{error}</p>) : null }

            <div className="mb-4">
                <label
                  className="text-slate-800"
                  htmlFor="codigo"
                >
                  Codigo:
                </label>

                <input
                  type="text"
                  id="codigo"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="codigo"
                  defaultValue={producto.codigo}
                  ref={codigoEditRef}

                />
              </div>

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
                  placeholder="Nombre"
                  defaultValue={producto.nombre}
                  ref={nombreEditRef}

                />
              </div>

              <div className="mb-4">
                <label
                  className="text-slate-800"
                  htmlFor="precio"
                >
                  Precio:
                </label>

                <input
                  type="text"
                  id="precio"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="precio"
                  placeholder="Precio"
                  defaultValue={producto.precio}
                  ref={precioEditRef}

                />
              </div>

              <div className="mb-4">
                <label
                  className="text-slate-800"
                  htmlFor="cantidad"
                >
                  Cantidad:
                </label>

                <input
                  type="text"
                  id="cantidad"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="cantidad"
                  placeholder="Cantidad"
                  defaultValue={producto.cantidad}
                  ref={cantidadEditRef}

                />
              </div>

              <div className="mb-4">
                <label
                  className="text-slate-800"
                  htmlFor="tipo"
                >
                  Tipo:
                </label>

                <select name="tipo" id="tipo" className="ml-3 mt-2 p-3 bg-gray-50" ref={tipoEditRef}>
                  <option value={producto.tipo}>{producto.tipo}</option>
                  <option value="producto">Producto</option>
                  <option value="servicio">Servicio</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="text-slate-800"
                  htmlFor="categoria_id"
                >
                  Categoria:
                </label>
                
                <select name="categoria_id" id="categoria_id" className="ml-3 mt-2 p-3 bg-gray-50" ref={categoriaEditRef}>

                    {categorias.map(categoria=>{
                      return(
                      <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                      )}
                    )}
                    </select> 
              
              </div>                
            </form>
            <button onClick={()=>{handleClickEditarProducto(producto.id)
                                  }}
                      className="bg-slate-900 hover:bg-slate-700 text-white p-3 rounded-md font-semibold">
                Guardar
              </button>  
          </div>
        </div>

      </Modal>

      <Modal isOpen={modal} style={customStyles}>

        <div className="overflow-y-scroll">
          <div className="flex justify-between">
            <h1 className="text-xl font-black">Añadir Producto</h1>

            
              <button onClick={handleClickModal}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            
          </div>

          <div className="bg-white shadow-md rounded-md px-2 py-2">

            <form encType="multipart/form-data">

            {errores ? errores.map(error=> <p key={error.id}>{error}</p>) : null }

            <div className="mb-4">
                <label
                  className="text-slate-800"
                  htmlFor="codigo"
                >
                  Codigo:
                </label>

                <input
                  type="text"
                  id="codigo"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="codigo"
                  placeholder="codigo"
                  ref={codigoRef}

                />
              </div>

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
                  placeholder="Nombre"
                  ref={nombreRef}

                />
              </div>

              <div className="mb-4">
                <label
                  className="text-slate-800"
                  htmlFor="precio"
                >
                  Precio:
                </label>

                <input
                  type="text"
                  id="precio"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="precio"
                  placeholder="Precio"
                  ref={precioRef}

                />
              </div>

              <div className="mb-4">
                <label
                  className="text-slate-800"
                  htmlFor="cantidad"
                >
                  Cantidad:
                </label>

                <input
                  type="text"
                  id="cantidad"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="cantidad"
                  placeholder="Cantidad"
                  ref={cantidadRef}

                />
              </div>

              <div className="mb-4">
                <label
                  className="text-slate-800"
                  htmlFor="tipo"
                >
                  Tipo:
                </label>

                <select name="tipo" id="tipo" className="ml-3 mt-2 p-3 bg-gray-50" ref={tipoRef}>
                  <option value="producto">Producto</option>
                  <option value="servicio">Servicio</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="text-slate-800"
                  htmlFor="categoria_id"
                >
                  Categoria:
                </label>
                
                <select name="categoria_id" id="categoria_id" className="ml-3 mt-2 p-3 bg-gray-50" ref={categoriaRef}>
                    {categorias.map(categoria=>{
                      return(
                      <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                      )}
                    )}
                    </select> 
              
              </div> 

              <div className="mb-4">
                <label
                  className="text-slate-800"
                  htmlFor="imagen"
                >
                  Imagen
                </label>

                <input
                  type="file"
                  id="imagen"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="imagen"
                  placeholder="Cargar imagen..."
                  ref={imagenRef}
                />
              </div> 

              <button onClick={handleSubmit}
                      className="bg-slate-900 hover:bg-slate-700 text-white p-3 rounded-md font-semibold">
                Registrar
              </button>                 
            </form>
          </div>
        </div>
      </Modal>


      <div className="mt-5">
        <table className="w-full text-center font-light bg-white">
          <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
            <tr>
              <th scope="col" className=" px-6 py-4">Nombre</th>
              <th scope="col" className=" px-6 py-4">Precio</th>
              <th scope="col" className=" px-6 py-4">Cantidad</th>
              <th scope="col" className=" px-6 py-4">Tipo</th>
              <th scope="col" className=" px-6 py-4">Imagen</th>
              <th scope="col" className=" px-6 py-4">Editar</th>
              <th scope="col" className=" px-6 py-4">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            
            {productos.map(producto=>{
              return(
                <tr key={producto.id} className="border-b dark:border-neutral-500 h-16">
                  <td className="text-lg">{producto.nombre}</td>
                  <td className="text-lg">{producto.precio}</td>
                  <td className="text-lg">{producto.cantidad}</td>
                  <td className="text-lg">{producto.tipo}</td>
                  <td className="text-lg">{producto.imagen}</td>
                  <td className="object-center">
                    <button onClick={()=>{handleClickEditModal()
                                          handleSetProducto(producto)}}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                      </svg>
                    </button>
                  </td>
                  <td>
                    <button onClick={()=>handleClickEliminarProducto(producto.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </td>
                </tr>
              )
            })
            }  
          
          </tbody> 
        </table>
      </div>

    </div>
  )
}
