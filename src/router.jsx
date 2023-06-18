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
import BoletaPDF from "./views/BoletaPDF";
import Comisiones from "./views/Comisiones";
import Horario from "./views/Horario";
import Incentivo from "./views/Incentivo";



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
                element:<Comisiones/>
            },
            {
                path:'/admin/horario',
                element:<Horario/>
            },
            {
                path:'/admin/maestros/incentivo',
                element:<Incentivo/>
            }

            
        ],
        


    },
    {
        path:'/descarga',
        element:<BoletaPDF/>
    }
])

export default router;