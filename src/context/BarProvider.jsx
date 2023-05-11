import {createContext, useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import clienteAxios from '../config/axios';

const BarContext = createContext();

const BarProvider = ({children}) =>{

    const[categorias, setCategorias] = useState([]);
    const[categoriaActual, setCategoriaActual] = useState({})
    const[modal, setModal] = useState(false);
    const[modalEdit,setModalEdit] = useState(false);
    const[mesas, setMesas] = useState([]);
    const[mesa, setMesa] = useState([]);
    const[producto, setProducto] = useState({});
    const[productos, setProductos] = useState([]);
    const[pedido, setPedido] = useState([]);
    const[total, setTotal] = useState(0)
    const[usuarios, setUsuarios] = useState([]);
    const[usuario, setUsuario] = useState([]);
    const[colaboradores, setColaboradores] = useState([]);
    const[colaborador, setColaborador] = useState([]);
    

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

    const obtenerUsuarios = async() =>{
        try {
            const {data} = await clienteAxios('api/usuarios')
            setUsuarios(data.data)
            
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerColaboradores = async() =>{
        try {
            const {data} = await clienteAxios('api/colaborador')
            setColaboradores(data.data)
            
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerProductos = async()=>{
        try {
            const{data} = await clienteAxios('api/productos')
            setProductos(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerMesas = async()=>{
        try {
            const{data} = await clienteAxios('api/mesas')
            setMesas(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        obtenerCategorias();
        obtenerUsuarios();
        obtenerColaboradores();
        obtenerProductos();
        obtenerMesas();
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

    const handleSetMesas = mesa =>{
        setMesas(mesa)
    }

    const handleSetMesa = mesa=>{
        setMesa(mesa)
    }

    const handleSetUsuario = usuario=>{
        setUsuario(usuario)
    }

    const handleSetColaborador = colaborador=>{
        setColaborador(colaborador)
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
                nombre,
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
            console.log(error)
        }
    } 

    const handleSubmitEditarUsuario = async id=>{
        try {
           const respuesta = await clienteAxios.put(`api/usuarios/${id}`,datos,
           {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            console.log(respuesta);
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickEditModal = ()=>{
        setModalEdit(!modalEdit);
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
                productos,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden,
                usuarios,
                colaboradores,
                mesas,
                handleSetMesas,
                mesa,
                handleSetMesa,
                handleSubmitEditarUsuario,
                modalEdit,
                handleClickEditModal,
                usuario,
                handleSetUsuario,
                colaborador,
                handleSetColaborador,
            }}

        >{children}</BarContext.Provider>
    )
}

export{
    BarProvider
}
export default BarContext