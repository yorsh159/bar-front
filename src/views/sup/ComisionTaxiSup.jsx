import useSWR from "swr";
import clienteAxios from "../../config/axios";
import useBar from "../../hooks/useBar";
import ResumenComisionTaxi from '../../components/ResumenComisionTaxi';
import ResumenColaboradorTaxi from "../../components/ResumenColaboradorTaxi";

export default function ComisionTaxiSup() {
    const token = localStorage.getItem('AUTH_TOKEN')
    const fetcher = () => clienteAxios('api/boletaComisionTaxi', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    const { data, error, isLoading } = useSWR('api/boletaComisionTaxi', fetcher /*,{refreshInterval:5000}*/)

    const comprobarComision = () => notaComisionTaxi.length === 0 
    const comprobarColaborador = () => notaTaxi.length === 0
  
    //console.log(data)
    const handleSubmitComision = async e=>{
      e.preventDefault()
  
      const token = localStorage.getItem('AUTH_TOKEN')
      try {
  
          const datos = {
              comisionBoleta:comisionTaxi,
              comisionUnitaria:comisionTaxiUnitaria,
              colaborador: notaTaxi.map(colaborador=>{
                  return{
                      id:colaborador.colaborador_id,
                      tipo:colaborador.tipo
                  }
              }),
              nota:notaComisionTaxi.map(boleta=>{
                  return{
                      id:boleta.boleta_id,
                  }
              })
              
          }
  
         //console.log(datos);
  
         await clienteAxios.post('api/comisionesTaxi',datos,
         {
             headers:{
                 Authorization: `Bearer ${token}`
             }
         })
         window.location.reload();
          
      } catch (error) {
          console.log(error)
      }
      
  }
  
   
  
    const {notaComisionTaxi,comisionTaxiUnitaria,handleClickNotaTaxi,comisionTaxi,taxi,notaTaxi,handleClickTaxi} = useBar();
  
  
  
    return (
      <div className="md:flex">
          <div className='w-96 h-auto'>
            <h1 className='text-4xl font-black text-gray-200'>Nota de Ventas</h1>
            <div className='h-80 w-96 overflow-y-scroll py-2 px-2'>
              {data?.data?.data?.map(ticket=>{
                  return(
                      <div key={ticket.id} className="p-5 border-b shadow  bg-white mb-3">
                          <p className="text-xl font-bold text-slate-600">
                                  Detalle de Nota de venta:
                          </p>
                          <p>
                              ID:
                              <span className="px-2 font-bold"> {ticket.boleta_id}</span>
                          </p>
                          <p>
                              Total:
                              <span className="px-2 font-bold">S./ {ticket.total_igv}</span>
                          </p>
                          <p>
                              Comision:
                              <span className="px-2 font-bold">S./ {ticket.comision}</span>
                          </p>
                          <p>
                              Fecha:
                              <span className="font-light px-2">{ticket.created_at}</span>
                          </p>
                          <button className="bg-red-600 hover:bg-red-700 rounded font-bold text-white text-center px-5 py-2 mt-3"
                                   onClick={()=>handleClickNotaTaxi(ticket)}
                          >
                              Agregar
                          </button>
                      </div>
                  )
              })}
            </div>
  
            <h1 className='text-4xl font-black text-gray-200'> Colaborador </h1>
            <div className='h-80 w-96 overflow-y-scroll py-2 px-2'>
              {taxi.map(taxi=>{
                  return(
                      <div key={taxi.id} className="p-5 border-b shadow  bg-white mb-3">
                          <p>Nombre: {taxi.nombre}</p>
                          <button className={`${comprobarComision() ? 'bg-red-400':'bg-red-600 hover:bg-red-7000'} px-5 py-2 rounded font-bold text-white text-center`}
                                 disabled={comprobarComision()}
                                 onClick={()=>handleClickTaxi(taxi)} 
                          >
                          Agregar
                          </button>
                        </div>
                  )
              })}
  
            </div>
          </div>
  
          <div className="w-2/3 ml-8">
              <h1 className="text-4xl font-black text-gray-200">Comisión</h1>
              <div className='flex flex-col'>
                  <div className='flex flex-row'>
                      <div className='bg-white w-1/2 h-96 overflow-y-scroll py-4 px-2'>
                          {notaComisionTaxi.length === 0 ? (
                                  <p>Agregue Nota de venta</p>
                              ) : (
                                  notaComisionTaxi.map((ticket)=>(
                                      <ResumenComisionTaxi
                                          key={ticket.id}
                                          ticket={ticket}
                                      />
                                  ))
                          )}
                      </div>
  
                      <div className='bg-white w-1/2 h-96 overflow-y-scroll py-4 px-2 ml-3'>
                          {notaTaxi.length === 0 ? (
                              <p>Agregue Taxista</p>):(
                                  notaTaxi.map((taxi)=>(
                                      <ResumenColaboradorTaxi
                                          key={taxi.id}
                                          taxi={taxi}
                                      />
                                  ))
                              )}
                      </div>
                  </div>
  
                  <div className='text-lg font-bold py-3 text-gray-200'>Comision a Pagar: S./
                      {comisionTaxi}
                  </div>
  
                  <div className='text-lg font-bold py-3 text-gray-200'>Comision por Usuario: S./
                      {comisionTaxiUnitaria}    
                  </div>
  
                  <form className='w-full'
                  >
                      <div className='mt-5'>
                          <input type="submit"
                                 value="Guardar"
                                 disabled={comprobarColaborador()}
                                 className={`${comprobarColaborador() ? 'bg-red-400':'bg-red-600 hover:bg-red-7000'} px-5 py-2 rounded font-bold text-white text-center`}
                                 onClick={handleSubmitComision}
                          />  
                      </div>
                  </form>
              </div>
          </div>
  
      </div>
    )
}
