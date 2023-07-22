import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import Inicio from "./views/Inicio";
import Login from "./views/Login";
import Registro from "./views/Registro";
import Pedidos from "./views/Pedidos";
import Productos from "./views/Productos";
import Mesas from "./views/Mesas";
import Ingresos from "./views/Ingresos";
import Administracion from "./views/Adminstracion";
import Usuarios from "./views/Usuarios";
import Colaborador from "./views/Colaborador";
import Boletas from "./views/Boletas";
import Maestros from "./views/Maestros";
import FormaPago from "./views/FormaPago";
import VerBoletas from "./views/VerBoletas";
import Horario from "./views/Horario";
import Incentivo from "./views/Incentivo";
import Comision from "./views/Comision";
import ComisionCompañia from "./views/ComisionCompañia";
import ComisionTaxi from "./views/ComisionTaxi";
import Liquidacion from "./views/Liquidacion";
import SupLayout from "./layouts/SupLayout";
import VerBoletasCaja from "./views/caja/VerBoletasCaja";
import ComisionCaja from "./views/caja/ComisionCaja";
import BoletasCaja from "./views/caja/BoletasCaja";
import PedidosCaja from "./views/caja/PedidosCaja";
import ComisionTaxiCaja from "./views/caja/ComisionTaxiCaja";
import ComisionCompañiaCaja from "./views/caja/ComisionCompañiaCaja";
import SupervisorLayout from "./layouts/SupervisorLayout";
import PedidoSup from "./views/sup/PedidoSup";
import ComisionSup from "./views/sup/ComisionSup";
import ComisionTaxiSup from "./views/sup/ComisionTaxiSup";
import ComisionCompañiaSup from "./views/sup/ComisionCompañiaSup";
import AdministracionSup from "./views/sup/AdministracionSup";
import UsuarioSup from "./views/sup/UsuarioSup";
import ColaboradorSup from "./views/sup/ColaboradorSup";
import HorarioSup from "./views/sup/HorarioSup";
import VerBoletasSup from "./views/sup/VerBoletasSup";




const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children:[
            {
                index: true,
                element: <Inicio />
            }
        ]
    },
    {
        path: '/auth',
        element:<AuthLayout />,
        children:[
            {
                path:'/auth/login',
                element: <Login />
            },
            {
                path:'/auth/registro',
                element: <Registro />,
            },
        
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children:[
            {
                index:true,
                element:<Pedidos/>,
            },
            {
                path:'/admin/productos',
                element: <Productos/>
            },
            {
                path:'/admin/mesas',
                element: <Mesas/>
            },
            {
                path:'/admin/ingresos',
                element:<Ingresos/>
            },
            {
                path:'/admin/administracion',
                element:<Administracion/>,
                
            },
            {
                path:'/admin/administracion/usuarios',
                element:<Usuarios/>,
            },
            {
                path:'/admin/administracion/colaborador',
                element:<Colaborador/>,
            },
            {
                path:'/admin/boletas',
                element:<Boletas/>,
            },
            {
                path:'/admin/verboletas',
                element:<VerBoletas/>
            },
            {
                path:'/admin/maestros',
                element:<Maestros/>
            },
            {
                path:'/admin/maestros/formapago',
                element:<FormaPago/>
            },
            {
                path:'/admin/comisiones',
                element:<Comision/>
            },
            {
                path:'/admin/comisiones/compañia',
                element:<ComisionCompañia/>
            },
            {
                path:'/admin/comisiones/taxi',
                element:<ComisionTaxi/>
            },
            {
                path:'/admin/horario',
                element:<Horario/>
            },
            {
                path:'/admin/maestros/incentivo',
                element:<Incentivo/>
            },
            {
                path:'/admin/liquidacion',
                element:<Liquidacion/>
            },
            

            
        ],

    },
    {
        path:'/caja',
        element:<SupLayout/>,
        children:[
            {
                path:'/caja/comision',
                element:<ComisionCaja/>
            },
            {
                path:'/caja/comision/taxi',
                element:<ComisionTaxiCaja/>

            },
            {
                path:'/caja/comision/compañia',
                element:<ComisionCompañiaCaja/>,
            },
            {
                path:'/caja/verboletas',
                element:<VerBoletasCaja/>
            },
            {
                path:'/caja/boletas',
                element:<BoletasCaja/>
            },
            {
                path:'/caja/pedidos',
                element:<PedidosCaja/>
            }
        ],
    },
    {
        path:'/supervisor',
        element:<SupervisorLayout/>,
        children:[
            {
                path:'/supervisor/pedidos',
                element:<PedidoSup/>
            },
            {
                path:'/supervisor/comision',
                element:<ComisionSup/>
            },
            {
                path:'/supervisor/comision/taxi',
                element:<ComisionTaxiSup/>
            },
            {
                path:'/supervisor/comision/compañia',
                element:<ComisionCompañiaSup/>
            },
            {
                path:'/supervisor/administracion',
                element:<AdministracionSup/>
            },
            {
                path:'/supervisor/administracion/usuario',
                element:<UsuarioSup/>
            },
            {
                path:'/supervisor/administracion/colaborador',
                element:<ColaboradorSup/>
            },
            {
                path:'/supervisor/horario',
                element:<HorarioSup/>
            },
            {
                path:'/supervisor/verboletas',
                element:<VerBoletasSup/>
            },

        ]
    }

])

export default router;