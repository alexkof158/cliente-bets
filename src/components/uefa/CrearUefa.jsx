import React, { useState } from 'react'
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'



const CrearUefa = () => {
    const [bet, setBet] = useState({
        name: '',
        description: '',
        cuota: '',
        fecha: '',
        stake: ''
    })

    const navigate = useNavigate();

    
    const actualizarState = (e)=>{
        setBet({
            ...bet,
            [e.target.name] : e.target.value
        })
        console.log(bet)
    }

    const agregarCliente = async e =>{
        e.preventDefault();
        try {
            await clienteAxios.post('/api/uefa/crear', bet)
            Swal.fire('Agregada')
            navigate("/uefa")
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon:  'error',
                title: 'Hubo un error',
                text:  'Error al agregar la apuesta. Contacta al administrador.',
                
            });
        }
    };

    const validarCliente = ()=>{

        const {name,description, cuota,fecha,stake} = bet;

        let valido = !name.length || !description.length || !cuota.length || !fecha.length || !stake.length ;

        //return true o false
        return valido;
    }

    return (

        
        <>
            <h1>Crear BET</h1>
            <form onSubmit={agregarCliente}>
                <legend>Agrega tu Bet al historial</legend>

                <div className="campo">
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" 
                    id="name" 
                    placeholder="Apostador" 
                    name="name" 
                    onChange={actualizarState}
                    />
                    
                </div>

                <div className="campo">
                    <label htmlFor="description">Descripción:</label>
                    <input type="text" 
                    id="description" 
                    placeholder="Describe tu apuesta" 
                    name="description" 
                    onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cuota">Cuota:</label>
                    <input type="text" 
                    id="cuota" 
                    placeholder="Anota la cuota de la Bet" 
                    name="cuota" 
                    onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="fecha">Fecha:</label>
                    <input type="date" 
                    id="fecha" 
                    placeholder="Fecha de la apuesta" 
                    name="fecha" 
                    onChange={actualizarState}
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
                    />
                </div>

                <div className="enviar">
                    <input type="submit" 
                    className="btn btn-azul" 
                    value="Agregar" 
                    disabled={validarCliente()}
                    />
                </div>
            </form>
        </>
    );
}

export default CrearUefa;
