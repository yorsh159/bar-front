import useBar from "../hooks/useBar"

export default function Categoria({categoria}) {

    const{handleClickCategoria, categoriaActual} = useBar();
    const {icono, id, nombre} = categoria

    const resaltarCategoriaActual = ()=> categoriaActual.id === id ? 'bg-amber-400' : 'bg-white'

  return (
    <div className={`${resaltarCategoriaActual()} flex items-center gap-4 border w-full p-2 
    hover:bg-blue-500`}>
        
        <img src={`/img/icono_${icono}.svg`} 
             alt=""
             className="w-12" />

        <button 
             className="text-lg font-bold truncate"
             type="button"
             onClick={()=>handleClickCategoria(id)}
        >{nombre}
        </button>

    </div>
  )
}
