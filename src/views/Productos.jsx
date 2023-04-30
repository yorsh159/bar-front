import  useSWR from "swr";
import clienteAxios from '../config/axios';



export default function Productos() {
  return (
    <div>
      <h1 className='text-4xl font-black'>Productos</h1>
      <p className='text-2xl my-6'>
        Lista de productos
      </p>
    </div>
  )
}
