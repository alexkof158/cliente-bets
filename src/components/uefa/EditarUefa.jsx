import React, { useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditarUefa = () => {

    const navigate = useNavigate()
    const { id } = useParams();

    const [bet, setBet] = useState({
        name: '',
        description: '',
        cuota: '',
        fecha: '',
        stake: ''
    })
    const consultarAPI = async () => {
       
        try {
            const consultaNba = await clienteAxios.get(`/api/uefa/editar/${id}`);
            console.log(consultaNba)
            if (consultaNba.data && consultaNba.data.bet) {
                setBet(consultaNba.data.bet);
            } else {
                console.error('Los datos devueltos por la API no tienen la estructura esperada');
            }
        } catch (error) {
            console.error('Error al consultar la API', error);
        }
    };
    
    useEffect(() => {

        consultarAPI();
        
    }, []);

    const actualizarState = (e)=>{
        setBet({
            ...bet,
            [e.target.name] : e.target.value
        })
        
    }


    const actualizarbet = async e  =>{
        e.preventDefault()
        try {
            await clienteAxios.put(`/api/uefa/editar/${id}`,bet)
            Swal.fire(
                'Correcto',
                'Se actualizo correctamente',
                'success'
            )
            navigate('/uefa')
            
        } catch (error) {
            console.log('Error al actualizar la apuesta', bet)
            Swal.fire({
                icon: error,
                title: 'Error',
                text: 'Error al actualizar'
            })
        }
    }
    
    

    return (

        
        <>
            <h1>EDITAR BET</h1>
            <form onSubmit={actualizarbet} >
                <legend>Editar tu Bet al historial</legend>

                <div className="campo">
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" 
                    id="name" 
                    placeholder="Apostador" 
                    name="name" 
                    onChange={actualizarState}
                    value={bet.name}
                    />
                    
                </div>

                <div className="campo">
                    <label htmlFor="description">Descripción:</label>
                    <input type="text" 
                    id="description" 
                    placeholder="Describe tu apuesta" 
                    name="description" 
                    onChange={actualizarState}
                    value={bet.description}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cuota">Cuota:</label>
                    <input type="text" 
                    id="cuota" 
                    placeholder="Anota la cuota de la Bet" 
                    name="cuota" 
                    onChange={actualizarState}
                    value={bet.cuota}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="fecha">Fecha:</label>
                    <input type="date" 
                    id="fecha" 
                    placeholder="Fecha de la apuesta" 
                    name="fecha" 
                    onChange={actualizarState}
                    value={bet.fecha}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="stake">Stake:</label>
                    <input type="text" 
                    id="stake" 
                    placeholder="Ingresa tu stake: Ej: 10-30% de tu capital" 
                    name="stake" 
                    pattern="^(10|20|30)$" 
                    title="El stake debe ser 10, 20 o 30" 
                    onChange={actualizarState}
                    value={bet.stake}
                    />
                </div>

                <div className="enviar">
                    <input type="submit" 
                    className="btn btn-azul" 
                    value="Actualizar" 
                    
                    
                    />
                </div>
            </form>
        </>
    );
};

export default EditarUefa;
