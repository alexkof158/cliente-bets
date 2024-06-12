import { useContext, useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { Link, useNavigate } from "react-router-dom";
import { FaBaseballBatBall } from "react-icons/fa6";
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importar íconos de edición y eliminación
import Swal from "sweetalert2";

import { CRMContext } from "../../context/CRMContext";

const Mlb = () => {
    const navigate = useNavigate();
    const [listaMlb, setListamlb] = useState([]);
    const [auth, guardarAuth] = useContext(CRMContext);

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const consultaMlb = await clienteAxios.get('/api/mlb/listar');
                setListamlb(consultaMlb.data.listar);
            } catch (error) {
                console.error('Error al consultar la API')
            }
        };
        consultarAPI();
        
    }, []);

    

    const eliminarBet = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Un bet no se puede recuperar",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/api/mlb/eliminar/${id}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                })
                    .then(res => {
                        Swal.fire(
                            'Borrado',
                            'Tu Bet ha sido borrado',
                            'success'
                        );
                        setListamlb(listaMlb.filter(item => item._id !== id)); // Actualiza la lista localmente
                    })
                    .catch(error => {
                        console.error('Error al eliminar el bet:', error);
                    });
            }
        });
    };

    return (
        <>
            <Link to={"/mlb/crear"} className='btn btn-azul'>Crear Bet</Link>
            <h1 className="title"> <FaBaseballBatBall /> Bets MLB <FaBaseballBatBall /></h1>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Stake</th>
                            <th>Fecha</th>
                            <th>Cuota</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaMlb.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.stake}</td>
                                <td>{item.fecha}</td>
                                <td>{item.cuota}</td>
                                <td>
                                    <Link to={`/mlb/editar/${item._id}`} className='btn btn-amarillo' >
                                        <FaEdit /> Editar
                                    </Link>
                                    <button className='btn btn-rojo' onClick={() => eliminarBet(item._id)} >
                                        <FaTrash /> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Mlb;
