import {createContext, useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import clienteAxios from '../config/axios';

const BarContext = createContext();

const BarProvider = ({children}) =>{

    const[categorias, setCategorias] = useState([]);
    const[categoriaActual, setCategoriaActual] = useState({})
    const[modal, setModal] = useState(false);
    const[modalEdit,setModalEdit] = useState(false);
    const[modalEntrada,setModalEntrada] = useState(false);
    const[modalSalida,setModalSalida] = useState(false);
    const[modalPedido,setModalPedido] = useState(false);
    const[modalFormaPago,setModalFormaPago] = useState(false);
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
    const[nota, setNota] = useState([])
    const[totalBoleta, setTotalBoleta] = useState(0)
    const[subTotalBoleta, setSubTotalBoleta] =useState(0)
    const[igvBoleta, setIgvBoleta] = useState(0)
    const[formaPago, setFormaPago] = useState([])
    const[formaPagos, setFormaPagos] = useState([])
    const[boletas, setBoletas] = useState([])
    const[notaComision,setNotaComision] = useState([])
    const[marcacion,setMarcacion] = useState([])
    const[horario,setHorario]=useState([])
    const[incentivo,setIncentivo]=useState([])
    const[pedidosAll,setPedidosAll]=useState([])
    const[comisionBoleta,setComisionBoleta]=useState(0)


    useEffect(()=>{
        const nuevoTotal = pedido.reduce((total,producto)=>(producto.precio * producto.cantidad)+total,0)
        setTotal(nuevoTotal)
    },[pedido])

    useEffect(()=>{
        const nuevoTotalBoleta = nota.reduce((total,pedido)=>(pedido.total*0.18+pedido.total)+total,0)
        setTotalBoleta(nuevoTotalBoleta)
    },[nota])

    useEffect(()=>{
        const nuevoSubTotal = nota.reduce((total,pedido)=>(pedido.total)+total,0)
        setSubTotalBoleta(nuevoSubTotal)
    })

    useEffect(()=>{
        const igv = nota.reduce((total,pedido)=>(pedido.total * 0.18)+total,0)
        setIgvBoleta(igv)
    })

    useEffect(()=>{
        const showComision = notaComision.reduce((comision,ticket)=>(ticket.comision)+comision,0)
        setComisionBoleta(showComision)
        //console.log(showComision)
    },[notaComision])


    const obtenerPedidosAll = async()=>{
        try {
            const {data} = await clienteAxios('api/pedidosAll')
            setPedidosAll(data.data)
        } catch (error) {
            console.log(error)
        }
    }

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

    const obtenerFormaPagos = async()=>{
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const {data} = await clienteAxios('api/pagos',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setFormaPagos(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerBoletas = async()=>{
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const {data} = await clienteAxios('api/boletas',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setBoletas(data)
        } catch (error) {
            console.log(error)
        }
    }
    
    const obtenerMarcacion = async()=>{
        try {
            const {data} = await clienteAxios('api/marcacion')
            setMarcacion(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerHorario = async()=>{
        try {
            const {data} = await clienteAxios('api/horario')
            setHorario(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerIncentivo = async()=>{
        try {
            const {data} = await clienteAxios('api/incentivo')
            setIncentivo(data.data)
        } catch (error) {
            console.log(error)
        }
    }
  

    useEffect(()=>{
        obtenerPedidosAll();
        obtenerCategorias();
        obtenerUsuarios();
        obtenerColaboradores();
        obtenerProductos();
        obtenerMesas();
        obtenerFormaPagos();
        obtenerBoletas();
        obtenerMarcacion();
        obtenerHorario();
        obtenerIncentivo();
 
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

    const handleSetFormaPago = formaPago=>{
        setFormaPago(formaPago)
    }

    const handleSetPedidosAll = pedidosAll=>{
        setPedidosAll(pedidosAll)
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

    const handleClickEditarUsuario = async id=>{
        try {
            await clienteAxios.put(`api/usuarios/${id}`,datos)
            console.log(id)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickEditModal = ()=>{
        setModalEdit(!modalEdit);
    }

    const handleClickModalEntrada = ()=>{
        setModalEntrada(!modalEntrada);
    }

    const handleClickModalSalida = ()=>{
        setModalSalida(!modalSalida);
    }

    const handleClickModalPedido = ()=>{
        setModalPedido(!modalPedido)
    }
    
    const handleClickAgregarNota = ({...pedido})=>{
        setNota([...nota,pedido])
        console.log(nota)
    }

    const handleEliminarNotaBoleta = id =>{

        console.log(id);

        const notaActualizado = nota.filter( pedido => pedido.id !== id)
        console.log(notaActualizado)
        setNota(notaActualizado)
        
    }

    const handleClickModalFormaPago = ()=>{
        setModalFormaPago(!modalFormaPago)
    }

    const handleClickAgregarNotaComision = ({...ticket})=>{
        setNotaComision([...notaComision, ticket])
        console.log(notaComision)
    }

    const handleEliminarNotaComision = id =>{

        console.log(id);

        const notaComisionActualizado = notaComision.filter( pedido => pedido.id !== id)
        console.log(notaComisionActualizado)
        setNotaComision(notaComisionActualizado)
        
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
                handleClickEditarUsuario,
                modalEdit,
                handleClickEditModal,
                usuario,
                handleSetUsuario,
                colaborador,
                handleSetColaborador,
                modalEntrada,
                handleClickModalEntrada,
                modalSalida,
                handleClickModalSalida,
                handleClickAgregarNota,
                nota,
                handleClickModalPedido,
                modalPedido,
                handleEliminarNotaBoleta,
                totalBoleta,
                subTotalBoleta,
                igvBoleta,
                modalFormaPago,
                handleClickModalFormaPago,
                formaPago,
                handleSetFormaPago,
                formaPagos,
                boletas,
                handleClickAgregarNotaComision,
                notaComision,
                handleEliminarNotaComision,
                marcacion,
                horario,
                incentivo,
                pedidosAll,
                handleSetPedidosAll,
                comisionBoleta,
                
            }}

        >{children}</BarContext.Provider>
    )
}

export{
    BarProvider
}
export default BarContext