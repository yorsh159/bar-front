import useBar from "../../hooks/useBar";
import Modal from 'react-modal';
import clienteAxios from '../../config/axios';
import { ToastContainer, toast } from 'react-toastify'
import { createRef, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';


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

export default function UsuarioSup() {
    const codigoRef = createRef();
    const nameRef = createRef();
    const emailRef = createRef();
    const roleRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();


    const nameEditRef = createRef();
    const emailEditRef = createRef();
    const roleEditRef = createRef();
    const passwordEditRef = createRef();

    const [errores, setErrores,] = useState([]);
    
    const handleSubmit = async e =>{
        e.preventDefault()
        
        const datos = {
            codigo: codigoRef.current.value,
            name: nameRef.current.value,
            email: emailRef.current.value,
            role: roleRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
  
        if(errores.length == 0){
          registro(datos,setErrores)
          handleClickModal()
          toast.success('Usuario Registrado')          
        }
        else{
          registro(datos,setErrores);
          toast.error('Error')
        }      
       
    }

    const handleClickEditarUsuario = async id=>{

      const datos = {
        name:nameEditRef.current.value,
        email:emailEditRef.current.value,
        role:roleEditRef.current.value,
        password:passwordEditRef.current.value,
      }

      try {
          await clienteAxios.put(`api/usuarios/${id}`,datos)
          console.log(id)
          window.location.reload()
      } catch (error) {
          console.log(error)
      }
    }

    const handleClickEliminarUsuario = async id=>{
      try {

        if(window.confirm('Está eliminando un usuario')){
          await clienteAxios.delete(`api/usuarios/${id}`)
          console.log(id)
          window.location.reload()
        }
        else{
          alert('De acuerdo')
        }
        
      } catch (error) {
        console.log(error)
      }
    }

    

  const {handleClickModal,usuarios,usuario,modal,handleSetUsuario,modalEdit,handleClickEditModal} = useBar()
  //console.log(modal);
  //console.log(errores.length);
  
  
  const{registro} = useAuth({ middleware: 'admin', url:'/admin/administracion/usuarios' });

  return (
    <>
    <div>
      <h1 className='text-4xl font-black text-gray-200'>Usuarios</h1>
      <p className='text-2xl my-6 text-gray-200'>Lista de usuarios</p>

      <button
        type="button"
        className="bg-amber-400 hover:bg-amber-500 text-white mt-2 p-3 font-bold rounded-md"
        onClick={() => {
          handleClickModal();
        }}
      >
        Nuevo Usuario

      </button>

      <Modal isOpen={modalEdit} style={customStyles}>
          <button onClick={handleClickEditModal}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h1>Editar</h1>

          <div className="bg-white shadow-md rounded-md px-2 py-2">

            <form method="POST">

              <div className="mb-4">
                <label
                  className="text-slate-800"
                  htmlFor="name"
                >
                  Nombre:
                </label>

                <input
                  type="text"
                  id="name"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="name"
                  placeholder="nombre"
                  defaultValue={usuario.name}
                  ref={nameEditRef} 
                />
              </div>

              <div className="mb-4">
                <label
                  className="text-slate-800"
                  htmlFor="email"
                >
                  E-mail:
                </label>

                <input
                  type="email"
                  id="email"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="email"
                  placeholder="Correo Electrónico"
                  ref={emailEditRef}
                  defaultValue={usuario.email}

                />
              </div>

              <div className="mb-4">
                <label
                  className="text-slate-800"
                  htmlFor="role"
                >
                  Perfil:
                </label>

                <select name="role" id="role" className="ml-3 mt-2 p-3 bg-gray-50" ref={roleEditRef}>
                  <option value={usuario.role}>{usuario.role}</option>
                  <option value="caja">Cajero</option>
                  <option value="mesero">Mesero</option>
                </select>
              </div> 
            </form>

            <div className="mb-4">
                <label
                  className="text-slate-800"
                  htmlFor="password"
                >
                  Contraseña:
                </label>

                <input
                  type="password"
                  id="password"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="password"
                  placeholder="Contraseña"
                  defaultValue={usuario.password}
                  ref={passwordEditRef}

                />
              </div>

            <button onClick={()=>{handleClickEditarUsuario(usuario.id)
                                  handleClickEditModal()}}
                      className="bg-slate-900 hover:bg-slate-700 text-white p-3 rounded-md font-semibold">
                Guardar
              </button>
             
          </div>

      </Modal>

      <Modal isOpen={modal} style={customStyles}>

        <div>
          <div className="flex justify-between">
            <h1 className="text-2xl font-black">Registrar</h1>

            
              <button onClick={handleClickModal}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            
          </div>

          <div className="bg-white shadow-md rounded-md px-2 py-2">

            <form>

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
                  htmlFor="name"
                >
                  Nombre:
                </label>

                <input
                  type="text"
                  id="name"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="name"
                  placeholder="Nombre"
                  ref={nameRef}

                />
              </div>

              <div className="mb-4">
                <label
                  className="text-slate-800"
                  htmlFor="email"
                >
                  E-mail:
                </label>

                <input
                  type="email"
                  id="email"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="email"
                  placeholder="Correo Electrónico"
                  ref={emailRef}

                />
              </div>

              <div className="mb-4">
                <label
                  className="text-slate-800"
                  htmlFor="role"
                >
                  Perfil:
                </label>

                <select name="role" id="role" className="ml-3 mt-2 p-3 bg-gray-50" ref={roleRef}>
                  <option value="caja">Cajero</option>
                  <option value="mesero">Mesero</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="text-slate-800"
                  htmlFor="password"
                >
                  Contraseña:
                </label>

                <input
                  type="password"
                  id="password"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="password"
                  placeholder="Contraseña"
                  ref={passwordRef}

                />
              </div>

              <div className="mb-4">
                <label
                  className="text-slate-800"
                  htmlFor="password_confirmation"
                >
                  Repetir Contraseña:
                </label>

                <input
                  type="password"
                  id="password_confirmation"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="password_confirmation"
                  placeholder="Repetir contraseña"
                  ref={passwordConfirmationRef}
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
              <th scope="col" className=" px-6 py-4">Email</th>
              <th scope="col" className=" px-6 py-4">Perfil</th>
              <th scope="col" className=" px-6 py-4">Editar</th>
              <th scope="col" className=" px-6 py-4">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            
            {usuarios.map(usuario=>{
              return(
                <tr key={usuario.id} className="border-b dark:border-neutral-500 h-16">
                  <td className="text-lg">{usuario.name}</td>
                  <td className="text-lg">{usuario.email}</td>
                  <td className="text-lg">{usuario.role}</td>
                  <td className="object-center">
                    <button onClick={() => {
                            handleClickEditModal();
                            handleSetUsuario(usuario);
                          }}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                      </svg>
                    </button>
                  </td>
                  <td>
                    <button onClick={()=>handleClickEliminarUsuario(usuario.id)}>
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

      <ToastContainer/>

    </div>
    </>
  )
}
