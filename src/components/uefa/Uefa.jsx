import { useEffect } from "react";
import clienteAxios from "../../config/axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importar íconos de edición y eliminación

import { IoFootball } from "react-icons/io5";
import Swal from "sweetalert2";



const Uefa = () => {

    const [listaUefa, setListauefa] = useState([])

    const consultaUefa = async ()=>{
        try {
            const consultaUefa = await clienteAxios.get('/api/uefa/listar')
            
            setListauefa(consultaUefa.data.listar)
        } catch (error) {
            console.log('Error en la api, consulte con el admin')
        }

    }

    useEffect(()=>{
        consultaUefa()
    },[listaUefa])


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
                clienteAxios.delete(`/api/uefa/eliminar/${id}`)
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
            <Link to={"/uefa/crear"} className='btn btn-azul'>Crear Bet</Link>
            <h1 className="title"> <IoFootball /> Bets Uefa <IoFootball  /></h1>

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
                        {listaUefa.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.stake}</td>
                                <td>{item.fecha}</td>
                                <td>{item.cuota}</td>
                                <td>
                                    <Link to={`/uefa/editar/${item._id}`} className='btn btn-amarillo' >
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

 
export default Uefa;