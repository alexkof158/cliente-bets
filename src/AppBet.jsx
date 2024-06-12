import React from "react";
import Header from "./components/Layout/Header";
import Navegacion from "./components/Layout/Navegacion";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Componentes de NBA
import Nba from "./components/nba/Nba";
import CrearBet from "./components/nba/CrearBet";
import EditarBet from "./components/nba/EditarBet";

// Componentes de MLB
import CrearMlb from "./components/mlb/CrearMlb";
import Mlb from "./components/mlb/Mlb";
import EditarMlb from "./components/mlb/EditarMlb";

// Componentes de UEFA
import Uefa from "./components/uefa/Uefa";
import CrearUefa from "./components/uefa/CrearUefa";
import EditarUefa from "./components/uefa/EditarUefa";

// Componentes de autenticación
import Login from "./components/auth/Login";

// Contexto
import { CRMProvider } from "./context/CRMContext";

export const AppBet = () => {
  return (
    <CRMProvider>
      <BrowserRouter>
        <Header />
        <div className="grid contenedor contenido-principal">
          <Navegacion />
          <main className="caja-contenido col-9">
            <Routes>
              {/* Rutas NBA */}
              <Route path="/nba" element={<Nba />} />
              <Route path="/nba/crear" element={<CrearBet />} />
              <Route path="/nba/editar/:id" element={<EditarBet />} />
              <Route path="/*" element={<Nba />} />

              {/* Rutas MLB */}
              <Route path="/mlb/crear" element={<CrearMlb />} />
              <Route path="/mlb" element={<Mlb />} />
              <Route path="/mlb/editar/:id" element={<EditarMlb />} />

              {/* Rutas UEFA */}
              <Route path="/uefa" element={<Uefa />} />
              <Route path="/uefa/crear" element={<CrearUefa />} />
              <Route path="/uefa/editar/:id" element={<EditarUefa />} />

              {/* Login */}
              <Route path="/iniciar-sesion" element={<Login />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </CRMProvider>
  );
};
