import { createRef, useState } from 'react';
import moment from "moment";
import clienteAxios from '../config/axios';
import { ToastContainer, toast } from 'react-toastify'
import useBar from '../hooks/useBar';



export default function Horario() {

  const inicioRef = createRef();
  const finRef = createRef();


  const {horario} = useBar();

  var fecha = moment(horario.inicio).format('YYYY-MM-DD H:mm')



  const handleClickHorario = async id=>{

    const datos = {
      inicio: moment(inicioRef.current.value).format('YYYY-MM-DD H:mm:ss'),
      fin: moment(finRef.current.value).format('YYYY-MM-DD H:mm:ss'),
    }
    try {

      await clienteAxios.put(`api/horario/${id}`,datos)
      console.log(datos)
      toast.success('Horario Guardado') 
    } catch (error) {
      console.log(error)
    }
  }


  return (

    <div>
        <h1 className='text-4xl font-black text-gray-200'>Horario</h1>
        <p className='text-2xl my-6 text-gray-200'>
            Indique el horario de inicio y cierre de atención.
        </p>

        <div className="p-3">

          <div className="p-2">
            <label className="text-gray-200 text-xl p-2" htmlFor="">Hora Incio: </label>
            <input type="datetime-local" className="p-2 rounded" ref={inicioRef} defaultValue={moment(horario.inicio).format('YYYY-MM-DD H:mm')}/>
          </div>

          <div className="p-2">
            <label className="text-gray-200 text-xl p-2" htmlFor="">Hora Fin: </label>
            <input type="datetime-local" className="p-2 rounded" ref={finRef} defaultValue={moment(horario.inicio).format('YYYY-MM-DD H:mm')} />
          </div>

          <button
            type="button"
            className="bg-amber-400 hover:bg-amber-500 text-white mt-2 p-3 font-bold rounded-md"
            onClick={() => {
              handleClickHorario();
            }}
          >
            Guardar Horario
          </button>

        </div>


        <ToastContainer/>

        
    </div>

  )
}
