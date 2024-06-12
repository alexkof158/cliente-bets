import React, { useState, useEffect, createContext } from "react";

// Crear el Context
export const CRMContext = createContext();

const CRMProvider = (props) => {
    // Definir el state de autenticación
    const [auth, guardarAuth] = useState({
        token: localStorage.getItem('token') || '',
        auth: localStorage.getItem('token') ? true : false
    });

    useEffect(() => {
        if (auth.token) {
            localStorage.setItem('token', auth.token);
        } else {
            localStorage.removeItem('token');
        }
    }, [auth.token]);

    return (
        <CRMContext.Provider value={[auth, guardarAuth]}>
            {props.children}
        </CRMContext.Provider>
    );
};

export { CRMProvider };
