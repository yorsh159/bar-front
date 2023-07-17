import { Link } from "react-router-dom";
import Modal from 'react-modal';
import clienteAxios from "../../config/axios";
import useBar from "../../hooks/useBar";
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

export default function ComisionSup() {
    const {handleClickModal,modal} = useBar()
    const codigoRef = createRef();
    const[colaborador, setColaborador]=useState([])

    const clickBuscar = async e=>{
        e.preventDefault()

        const codigo = codigoRef.current.value

        try {
            const respuesta = await clienteAxios.get(`api/pagoComision/buscar/${codigo}`)
            setColaborador(respuesta.data.data)
            console.log(respuesta.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const clickPagar = async e=>{
        //e.preventDefault()
        
        const codigo= codigoRef.current.value

        try {
            const upd = await clienteAxios.post(`api/pagoComision/${codigo}`)
            //console.log(datos)
            console.log(upd)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1 className='text-4xl font-black text-gray-200'>Comisiones</h1>  
            <p className='text-2xl my-6 text-gray-200'>Registro de comisiones</p>
    
            <div className="flex flex-row p-4 text-4xl text-center">
                <div className="w-full">
                   <Link to='/supervisor/comision/compañia' className="flex flex-col hover:bg-blue-500 text-gray-200">
                        Compañia     
                   </Link> 
                   
                </div>
                <div className="w-full">
                   <Link to='/supervisor/comision/taxi' className="flex flex-col hover:bg-blue-500 text-gray-200">
                        Taxistas
                   </Link> 
                </div>
            </div>

            <div>
                <button
                    type="button"
                    className="bg-amber-400 hover:bg-amber-500 text-white mt-2 p-3 font-bold rounded-md"
                    onClick={() => {
                        handleClickModal();
                    }}
                >
                    Pagar Comisión

                </button>
            </div>

            <Modal isOpen={modal} style={customStyles}>
                <button onClick={handleClickModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                Entrada

                <form action="POST">

                    <div className="mb-4 w-64">
                        <label htmlFor="">Código</label>
                        <input
                            type="text"
                            id="codigo"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="codigo"
                            placeholder="codigo"
                            ref={codigoRef}
                        />
                        {colaborador.length===0 ? (<p>No hay comision a pagar</p>): (colaborador.map(colaborador=>{
                            return(
                                <div key={colaborador.id}>
                                    <label htmlFor="">Monto a Pagar</label>
                                    <input type="text" id="monto" className="mt-2 w-full p-3 bg-gray-50" name="monto" value={colaborador.comision} />
                                </div>
                            )}))}
                      
                        
                    </div>

                </form>
                <button className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-md font-semibold"
                        onClick={clickBuscar}>
                    Buscar
                </button>

                <button className="bg-red-600 hover:bg-red-500 text-white p-2 ml-2 rounded-md font-semibold"
                        onClick={() => {
                        clickPagar()
                        handleClickModal()
                        
                }}>
                    Pagar
                </button>
            </Modal>
    
        </div>
      )
}
