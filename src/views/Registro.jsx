import { createRef, useState } from 'react';
import {Link} from 'react-router-dom';
import clienteAxios from '../config/axios';
import { useAuth } from '../hooks/useAuth';

export default function Registro() {

    const nameRef = createRef();
    const emailRef = createRef();
    const roleRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const [errores, setErrores] = useState([]);
    
    const {registro} = useAuth({middleware:'guest',url:'/'})

    const handleSubmit = async e =>{
        e.preventDefault()
        
        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            role: roleRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        registro(datos,setErrores);
        
    }


  return (
    <>
        <h1 className="text-4xl font-black">Registrar</h1>
        <p>Crea tu cuenta</p>

        <div className="bg-white shadow-md rounded-md mt-5 px-5 py-10">
            
            <form onSubmit={handleSubmit}
                    noValidate> 

                {errores ? errores.map(error=> <p>{error}</p>) : null }

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

                <input 
                    type="text"
                    id="role"
                    className="mt-2 w-full p-3 bg-gray-50"
                    name="role"
                    placeholder="Perfil"
                    ref={roleRef}
                />
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

                <input type="submit"
                       value="Crear Cuenta"
                       className="bg-slate-900 hover:bg-slate-700 text-white mt-5 p-3 rounded-md font-semibold" />

            </form>
        </div>

        <nav className="mt-4">
            <Link to="/auth/login"> Ya tienes cuenta? Incia Sesión </Link>
        </nav>
    </>
  )
}
