import Modal from 'react-modal';
import useBar from '../hooks/useBar';
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

export default function Ingresos() {

  const codigoRef = createRef();

  const handleClickEntrada =  e=>{
      

      const datos={
        codigo: codigoRef.current.value,
      }

      try {
        console.log(datos)
      } catch (error) {
        console.log(error)
      }
  }

  const handleClickSalida =  e=>{
      

    const datos={
      codigo: codigoRef.current.value,
    }

    try {
      console.log(datos)
    } catch (error) {
      console.log(error)
    }
}

  const {handleClickModalEntrada,handleClickModalSalida,modalEntrada,modalSalida} = useBar();

  return (
    <div>
        <h1 className='text-4xl font-black text-gray-200'>Ingresos</h1>
        
        <p className='text-2xl my-6 text-gray-200'>
           Registrar entrada y salida
        </p>

        <div className="flex flex-row p-4 text-4xl w-full" >
          <div className="w-full p-6">
            <button className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-md font-semibold"
                    onClick={handleClickModalEntrada}>
              Entrada
            </button>
          </div>

          <div className="w-full p-6">
            <button className="bg-red-600 hover:bg-red-500 text-white p-3 rounded-md font-semibold"
                    onClick={handleClickModalSalida}>
              Salida
            </button>
          </div>
        </div>

        <Modal isOpen={modalEntrada} style={customStyles}>
          <button onClick={handleClickModalEntrada}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

            Entrada

            <form action="POST">
            <div className="mb-4">
            <label htmlFor="">Código</label>
            <input
                  type="text"
                  id="codigo"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="codigo"
                  placeholder="codigo"
                  ref={codigoRef}
            />
            </div>
            </form>

            <button onClick={()=>handleClickEntrada()}>
              Marcar Entrada
            </button>

        </Modal>

        <Modal isOpen={modalSalida} style={customStyles}>
          <button onClick={handleClickModalSalida}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
            Salida

            <form action="POST">
            <div className="mb-4">
            <label htmlFor="">Código</label>
            <input
                  type="text"
                  id="codigo"
                  className="mt-2 w-full p-3 bg-gray-50"
                  name="codigo"
                  placeholder="codigo"
                  ref={codigoRef}
            />
            </div>
            </form>

            <button onClick={()=>handleClickSalida()}>
              Marcar Salida
            </button>
        </Modal>

    </div>
  )
}
