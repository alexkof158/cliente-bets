import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';
import Swal from 'sweetalert2';

const Header = () => {
    const navigate = useNavigate();
    const [auth, guardarAuth] = useContext(CRMContext);

    const cerrarSesion = () => {
        Swal.fire({
            title: '¿Cerrar Sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí'
        }).then((result) => {
            if (result.isConfirmed) {
                guardarAuth({
                    token: '',
                    auth: false
                });
                localStorage.setItem('token', '');
                // redireccionar
                navigate('/iniciar-sesion');
            }
        });
    };

    return (
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                    <Link to={'/nba'}>
                        <h1>CRM - Historial - Sports</h1>
                    </Link>

                    {auth.auth ? (
                        <button
                            type="button"
                            className="btn btn-rojo"
                            onClick={cerrarSesion}
                        >
                            Cerrar Sesión
                            <i className="far fa-times-circle"></i>
                        </button>
                    ) : null}
                </div>
            </div>
        </header>
    );
};

export default Header;
