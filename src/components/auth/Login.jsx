import { useContext, useState } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";

import { CRMContext } from "../../context/CRMContext";

const Login = () => {

    const [auth,guardarAuth] = useContext(CRMContext)   
    const navigate = useNavigate()

    const [credenciales, guardarCredenciales] = useState({})

    const iniciarSesion = async e =>{
        e.preventDefault()


        try {
            const respuesta = await clienteAxios.post('/api/usuarios/iniciar-sesion', credenciales)
            const {token}  = respuesta.data
            localStorage.setItem('token', token)
            //colocar token en el state
            guardarAuth({
                token,
                auth: true
            })

            Swal.fire(
                'Login Correcto',
                'Has iniciado sesión correctamente',
                'success'
            )

            navigate('/nba')
            
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: error.response.data.mensaje
            })
        }
    }

    const leerDatos = e =>{
        guardarCredenciales({
            ...credenciales,
            [e.target.name] : e.target.value
        })
    }
    return ( 
        <>
            <div className="login">
                <h2>Iniciar Sesión</h2>
                
                <div className="contenedor-formulario">
                    <form onSubmit={iniciarSesion}>
                        <div className="campo">
                            <label>Email</label>
                            <input 
                                type="email"
                                name="email"
                                placeholder="Email para iniciar sesion"
                                required
                                onChange={leerDatos}
                            />
                        </div>

                        <div className="campo">
                            <label>Password</label>
                            <input 
                                type="password"
                                name="password"
                                placeholder="Password para iniciar sesion"
                                required
                                onChange={leerDatos}
                            />
                        </div>
                        <input type="submit" value="Iniciar Sesión" className="btn btn-verde btn-block"/>
                    </form>

                </div>
            </div>
        </>
     );
}
 
export default Login;