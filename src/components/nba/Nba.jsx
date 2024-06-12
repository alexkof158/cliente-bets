import React, { useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importar íconos de edición y eliminación
import { FaBasketball } from "react-icons/fa6";



import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';



const Nba = () => {
    

    const [listaNba, setListaNba] = useState([]);

    const consultarApi = async () => {
        try {
            const consultaNba = await clienteAxios.get('/api/midas');
            if (consultaNba.data && consultaNba.data.listar) {
                setListaNba(consultaNba.data.listar);
            } else {
                console.error('Los datos devueltos por la API no tienen la estructura esperada');
            }
        } catch (error) {
            console.error('Error al consultar la API', error);
        }
    };

    useEffect(() => {
        consultarApi();
    }, [listaNba]);


    const eliminarBet =  (id) => {
        // Lógica para manejar la eliminación del elemento en la posición 'index'

        Swal.fire({
            title: "Estas seguro?",
            text: "Un bet no se puede recuperar",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                //Llmado a axios
                clienteAxios.delete(`/api/midas/eliminar/${id}`)
                    .then(res=>(
                        Swal.fire(
                            'Borrado',
                            'Tu Bet ha sido borrado',
                            'success'
                        )
                    ))

                    
            }
        });
    };

    return (
        <>
            <Link to={"/nba/crear"} className='btn btn-azul'>Crear Bet</Link>
            <h1 className="title"> <FaBasketball /> Bets NBA <FaBasketball /></h1>

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
                        {listaNba.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.stake}</td>
                                <td>{item.fecha}</td>
                                <td>{item.cuota}</td>
                                <td>
                                    <Link to={`/nba/editar/${item._id}`} className='btn btn-amarillo' >
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

export default Nba;
