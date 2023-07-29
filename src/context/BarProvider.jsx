import {createContext, useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import clienteAxios from '../config/axios';
import dniAxios from '../config/dniaxios';

const BarContext = createContext();

const BarProvider = ({children}) =>{

    const[categorias, setCategorias] = useState([]);
    const[categoriaActual, setCategoriaActual] = useState({})
    const[modal, setModal] = useState(false);
    const[modalBoleta, setModalBoleta] = useState(false);
    const[modalEdit,setModalEdit] = useState(false);
    const[modalEditPassword,setModalEditPassword]=useState(false);
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
    const[notaComisionTaxi,setNotaComisionTaxi]=useState([])
    const[notaColaborador,setNotaColaborador]=useState([])
    const[notaTaxi, setNotaTaxi]=useState([])
    const[marcacion,setMarcacion] = useState([])
    const[horario,setHorario]=useState([])
    const[incentivos,setIncentivos]=useState([])
    const[incentivo,setIncentivo]=useState([])
    const[pedidosAll,setPedidosAll]=useState([])
    const[comisionBoleta,setComisionBoleta]=useState(0)
    const[comisionUnitaria,setComisionUnitaria]=useState(0)
    const[comisionTaxi,setComisionTaxi]=useState(0)
    const[comisionTaxiUnitaria, setComisionTaxiUnitaria]=useState(0)
    const[taxi,setTaxi]=useState([])
    const[dni, setDni]=useState([])
    const[boleta,setBoleta]=useState([])

    //Liquidacion
    const[ventaTotal,setVentaTotal]=useState([])
    const[metPag,setMetPag]=useState([])
    const[comision,setComision]=useState([])
    const[ventas,setVentas]=useState([])
    const[pedidoLibre,setPedidoLibre]=useState([])
    const[comisionPagada,setComisionPagada]=useState([])

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

    useEffect(()=>{

        const showComision = notaComision.reduce((comision,ticket)=>(ticket.comision)+comision,0)
        const nroColaborador = notaColaborador.length
        
        if(showComision !=0 && nroColaborador !=0 ){
        
        const showComisionUnit = (showComision/nroColaborador)
        setComisionUnitaria(showComisionUnit)
        console.log(showComisionUnit)
        }
        else{
        const showComisionUnit = 0
        setComisionUnitaria(showComisionUnit)
        }
    })

    useEffect(()=>{
        const showComisionTaxi = notaComisionTaxi.reduce((comision,ticket)=>(ticket.comision)+comision,0)
        setComisionTaxi(showComisionTaxi)
        //console.log(showComision)
    },[notaComisionTaxi])

    useEffect(()=>{

        const showComisionTaxi = notaComisionTaxi.reduce((comision,ticket)=>(ticket.comision)+comision,0)
        const nroTaxi = notaTaxi.length
        
        if(showComisionTaxi !=0 && nroTaxi !=0 ){
        
        const showComisionTaxiUnit = (showComisionTaxi/nroTaxi)
        setComisionTaxiUnitaria(showComisionTaxiUnit)
        console.log(showComisionTaxiUnit)
        }
        else{
        const showComisionTaxiUnit = 0
        setComisionTaxiUnitaria(showComisionTaxiUnit)
        }
    })


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

    const obtenerIncentivos = async()=>{
        try {
            const {data} = await clienteAxios('api/incentivo')
            setIncentivos(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerTaxis = async()=>{
        try {
            const {data} = await clienteAxios('api/marcacionTaxi')
            setTaxi(data.data)
            //console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerVentaTotal = async()=>{
        try {
            const{data}=await clienteAxios('api/liquidacion')
            setVentaTotal(data.data)
            //console.log(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerMetPag = async()=>{
        try {
            const{data}=await clienteAxios('api/liquidacion/mp')
            setMetPag(data.data)
            //console.log(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerComision = async()=>{
        try {
            const{data}=await clienteAxios('api/liquidacion/comision')
            setComision(data.data)
            //console.log(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerVentas = async()=>{
        try {
            const{data}=await clienteAxios('api/liquidacion/ventas')
            setVentas(data.data)
            //console.log(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerPedidoLibre = async()=>{
        try {
            const {data} = await clienteAxios('api/liquidacion/pedidoLibre')
            setPedidoLibre(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerComisionPagada = async()=>{
        try {
            const {data} = await clienteAxios('api/liquidacion/comisionPagada')
            setComisionPagada(data.data)
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
        obtenerIncentivos();
        obtenerTaxis();
        obtenerVentaTotal();
        obtenerMetPag();
        obtenerComision();
        obtenerVentas();
        obtenerPedidoLibre();
        obtenerComisionPagada();
    },[])

    const handleClickCategoria = id =>{
        const categoria = categorias.filter(categoria => categoria.id===id)[0]
        setCategoriaActual(categoria)
    }

    const handleClickModalBoleta = ()=>{
        setModalBoleta(!modalBoleta)
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

    const handleSetIncentivo = incentivo=>{
        setIncentivo(incentivo)
    }

    const handleSetBoleta = boleta=>{
        setBoleta(boleta)
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

    const handleClickEditModalPassword = ()=>{
        setModalEditPassword(!modalEditPassword)
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

    const handleClickObtenerDni = async dni =>{

        const token1='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1pbmRjb250cm9sNTY0QGdtYWlsLmNvbSJ9.YeJ-WwE2Xdnlm7-ZCufb2Wb_u9BjysN8vrQ8rS6Fpws';
        const busqueda = await dniAxios.get(`${dni}?token=${token1}`)
        setDni(busqueda)


    }
    
    const handleClickAgregarNota = ({...pedido})=>{
        if(nota.some(notaState=>notaState.id === pedido.id)){
            const notaActualizado = nota.map(notaState=>notaState.id === pedido.id ? pedido:notaActualizado)
            setNota(notaActualizado)
        }else{
            setNota([...nota,pedido])
        }
        
        //console.log(nota)
    }

    const handleEliminarNotaBoleta = id =>{
        const notaActualizado = nota.filter( pedido => pedido.id !== id)
        //console.log(notaActualizado)
        setNota(notaActualizado)
    }

    const handleClickModalFormaPago = ()=>{
        setModalFormaPago(!modalFormaPago)
    }

    const handleClickAgregarNotaComision = ({...ticket})=>{ 
        if(notaComision.some(notaComisionState => notaComisionState.id === ticket.id)){
            const notaComisionActualizado = notaComision.map(notaComisionState => notaComisionState.id === ticket.id ? ticket:notaComisionState)
            setNotaComision(notaComisionActualizado)
        }else{
            setNotaComision([...notaComision, ticket])
        }
    }

    const handleEliminarNotaComision = id =>{
        const notaComisionActualizado = notaComision.filter( pedido => pedido.id !== id)
        setNotaComision(notaComisionActualizado)  
        //console.log(id)
        //console.log('handleEliminarNotaComision')
    }

    const handleClickNotaColaborador = ({...marcacion})=>{

        if(notaColaborador.some(notaColaboradorState => notaColaboradorState.id === marcacion.id)){
            const notaColaboradorActualizado = notaColaborador.map(notaColaboradorState => notaColaboradorState.id === marcacion.id ? marcacion:notaColaboradorState)
            setNotaColaborador(notaColaboradorActualizado)
        }else{
            setNotaColaborador([...notaColaborador,marcacion])
        }
    }

    const handleClickEliminarColaborador = id=>{       
        const notaColaboradorActualizado = notaColaborador.filter(marcacion => marcacion.id !== id)
        setNotaColaborador(notaColaboradorActualizado)
        //console.log(notaColaboradorActualizado);
    }

    const handleClickNotaTaxi = ({...ticket})=>{
        if(notaComisionTaxi.some(notaComisionTaxiState => notaComisionTaxiState.id === ticket.id)){
            const notaComisionTaxiActualizado = notaComisionTaxi.map(notaComisionTaxiState => notaComisionTaxiState.id === ticket.id ? ticket:notaComisionTaxiState)
            setNotaComisionTaxi(notaComisionTaxiActualizado)
        }else{
            setNotaComisionTaxi([...notaComisionTaxi, ticket])
        }
    }

    const handleEliminarNotaTaxi = id=>{
        const notaComisionTaxiActualizado = notaComisionTaxi.filter( ticket => ticket.id !== id)
        setNotaComisionTaxi(notaComisionTaxiActualizado)  
        //console.log(id)
        //console.log('handleEliminarNotaTaxi')
    }
   
    const handleClickTaxi = ({...taxi})=>{
        if(notaTaxi.some(notaTaxiState=>notaTaxiState.id === taxi.id)){
            const notaTaxiActualizado = notaTaxi.map(notaTaxiState => notaTaxiState.id === taxi.id ? taxi: notaTaxiState)
            setNotaTaxi(notaTaxiActualizado)
        }else{
            setNotaTaxi([...notaTaxi,taxi])
        }
        
    }

    const handleClickEliminarTaxi = id =>{
        const notaTaxiActualizado = notaTaxi.filter(taxi => taxi.id !== id)
        setNotaTaxi(notaTaxiActualizado)
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
                incentivos,
                incentivo,
                handleSetIncentivo,
                pedidosAll,
                handleSetPedidosAll,
                comisionBoleta,
                notaColaborador,
                handleClickNotaColaborador,
                handleClickEliminarColaborador,
                comisionUnitaria,
                dni,
                handleClickObtenerDni,
                notaTaxi,
                handleClickNotaTaxi,
                notaComisionTaxi,
                handleEliminarNotaTaxi,
                comisionTaxi,
                taxi,
                handleClickTaxi,
                handleClickEliminarTaxi,
                comisionTaxiUnitaria,
                ventaTotal,
                metPag,
                comision,
                ventas,
                pedidoLibre,
                modalBoleta,
                handleClickModalBoleta,
                handleSetBoleta,
                boleta,
                comisionPagada,
                modalEditPassword,
                handleClickEditModalPassword
            }}

        >{children}</BarContext.Provider>
    )
}

export{
    BarProvider
}
export default BarContext