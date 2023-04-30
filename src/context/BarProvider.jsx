import {createContext, useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import clienteAxios from '../config/axios';

const BarContext = createContext();

const BarProvider = ({children}) =>{

    const[categorias, setCategorias] = useState([]);
    const[categoriaActual, setCategoriaActual] = useState({})
    const[modal, setModal] = useState(false);
    const[producto, setProducto] = useState({});
    const[pedido, setPedido] = useState([]);
    const[total, setTotal] = useState(0)

    useEffect(()=>{
        const nuevoTotal = pedido.reduce((total,producto)=>(producto.precio * producto.cantidad)+total,0)
        setTotal(nuevoTotal)
    },[pedido])

    const obtenerCategorias = async() =>{
        try {
            const {data} = await clienteAxios('api/categorias')
            setCategorias(data.data)
            setCategoriaActual(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        obtenerCategorias();
    },[])

    const handleClickCategoria = id =>{
        const categoria = categorias.filter(categoria => categoria.id===id)[0]
        setCategoriaActual(categoria)
    }

    const handleClickModal = () =>{
        setModal(!modal)
    }

    const handleSetProducto = producto =>{
        setProducto(producto)
    }

    const handleAgregarPedido = ({categoria_id, ...producto})=>{
        
        if(pedido.some( pedidoState => pedidoState.id === producto.id )){
            const pedidoActualizado = pedido.map( pedidoState => pedidoState.id === producto.id ? producto:pedidoState)
            setPedido(pedidoActualizado)
            toast.success('Actualizado Exitosamente')
            
        }else{
            setPedido([...pedido, producto])
            toast.success('Agregar Pedido')
        }
    }

    const handleEditarCantidad = id =>{
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal)
    }

    const handleEliminarProductoPedido = id =>{
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Eliminado del pedido')
    }

    const handleSubmitNuevaOrden = async () =>{

        const token = localStorage.getItem('AUTH_TOKEN')

        try {
            const{ data } = await clienteAxios.post('/api/pedidos',
            {
                total,
                productos: pedido.map(producto=>{
                    return{
                        id: producto.id,
                        cantidad: producto.cantidad,
                    }
                }),
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            toast.success(data.message);
            setTimeout(()=>{
                setPedido([])
            },1000);
            
            //Cerrar la sesión del usuario

        } catch (error) {
            
        }
    } 
    
    return(
        <BarContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden,
            }}

        >{children}</BarContext.Provider>
    )
}

export{
    BarProvider
}
export default BarContext