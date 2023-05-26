import { createRef,useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';


export default function Login() {

    const emailRef = createRef();
    const passwordRef = createRef();

    const [errores, setErrores] = useState([])
    const {login} = useAuth({
        middleware: 'guest',
        url:'/'
    });

    const handleSubmit = async e=>{
        e.preventDefault();

        const datos = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        login(datos, setErrores)
    }

  return (
    <>
        <h1 className="text-4xl font-black text-gray-200">Iniciar Sesion</h1>

        <div className="bg-white shadow-md rounded-md mt-5 px-5 py-10">
            
            <form onSubmit={handleSubmit}>
            {errores ? errores.map(error=> <p>{error}</p>) : null }

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

                <input type="submit"
                        value="Ingresar"
                        className="bg-slate-900 hover:bg-slate-700 text-white mt-5 p-3 rounded-md font-semibold align-middle" />

            </form>
        </div>

        {/* <nav className="mt-4">
            <Link to="/auth/registro"> Registrate </Link>
        </nav> */}
    </>
  )
}
